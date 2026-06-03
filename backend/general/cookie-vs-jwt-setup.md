# cookie vs jwt setup

Basically - if key is somehow part of DB log for user, it is session based (cannot be spread among servers, one DB instance holds it), if the key is a token, the authentication is cryptographic and no DB is needed to compare to (problem is the jwt is valid longer than a hypothetical lgout may occur rendering it a valid tool for requests reqgradless of user logouting)

### How cookies work in terms authentication and of server memory?

How do we idenfity - via username and password. They live on the **DB**. in the backend, they are checked and if valid a session object is created. The session object live in **Redis** (temporaray Server's Memory).

**Initial Authenticaion:**

1. React sends the Username and Password to the Backend.

2. The Backend looks in the Database to see if that user exists and if the password matches.

3. Once verified, the server is done with the password. It doesn't need it anymore.

4. The server creates a session and puts just enough info in there to remember who you are—usually just the user_id.

**Subsequent Authenticaion:**


1. Browser sends the Cookie with the Session ID.

2. Server looks up the Session ID and finds the Session Object.

3. Server sees { user_id: 42 } inside that object.

4. Server does a quick database query: SELECT username FROM users WHERE id = 42.

5. Server sends the username back to your React app.


### Security flaw
**Session highjacking** - If an attacker manages to copy your session cookie name and value (the "Session ID"), they can paste it into their own browser and access your account without ever knowing your username or password.



# Difference betweeen cookie and jwt setup:

## Session Mechanism (Cookie)

| Step                | What Happens                                                                 |
|---------------------|------------------------------------------------------------------------------|
| After Login         | Server saves user data in a "Session Store."                                 |
| What is sent to FE  | A random "Key" (e.g., abc-123).                                              |
| Server Storage      | Stateful: Server uses RAM/Disk (or Redis) to store sessions.                 |
| On Next Request     | Server: "Give me the ID, let me go check my database to see who this is."    |

## Token Mechanism (JWT)

| Step                | What Happens                                                                 |
|---------------------|------------------------------------------------------------------------------|
| After Login         | Server packs user data into a "Token string."                                |
| What is sent to FE  | The actual "Data" (e.g., eyJhbGci...).                                       |
| Server Storage      | Stateless: Server has zero memory of the login.                              |
| On Next Request     | Server: "Give me the Token, let me decode it to see who you say you are."    |


So with sessions, the data is on the sever and the id is the key to it, while with token, the data is coming as a key and on the server is stored the "decryptor" of that key(data) object.


### Why does this matter for your code?

- **In Session Auth**: If you have two backend servers (Server A and Server B) and the user logs into Server A, but the next request goes to Server B, Server B will reject the user because it doesn't have that session in its RAM. You have to sync their memories (usually using Redis).

- **In Token Auth**: If you have 100 backend servers, they don't need to talk to each other. As long as they all share the same "Secret Key" to decode the packet, any server can verify any user at any time.


# Basic Backend Examples (Node.js / Express)

## Cookie / Session Example

The server keeps the session data in memory (or Redis) and only sends a session ID to the browser.

> **Where do the sessions actually live in this example?**
> Inside the **Node.js process's RAM**. Since we don't pass a `store` option, `express-session` defaults to its built-in `MemoryStore` — which is literally just a JavaScript object held in memory:
> ```js
> sessions = {
>   "9f3a1b8c...": { userId: 42 },
>   "a4b8c1d9...": { userId: 17 },
> }
> ```
> ⚠️ This means: if the Node server restarts, **all sessions are wiped**. And if you run two Node servers, they don't share this object. For production you'd replace `MemoryStore` with a `RedisStore` so all servers point at the same external store.

```js
const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// This one line wires up EVERYTHING. The `express-session`
// library is now a middleware that runs on every request.
// It will:
//   - read the "connect.sid" cookie from incoming requests
//   - verify its signature using `secret`
//   - look up the session data in the store (here: in Node's RAM)
//   - generate a NEW session ID (random string) when needed
//   - send a "Set-Cookie" header back to the browser
// ─────────────────────────────────────────────────────────────
app.use(session({
  secret: "super-secret-key",   // used to SIGN the session ID so it can't be tampered with
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 }
  // store: <-- not specified, so it defaults to MemoryStore (a JS object in this process's RAM).
  //            In prod you'd pass a RedisStore here.
}));

// Fake user DB
const users = [{ id: 42, username: "vasil", password: "1234" }];


// ─── LOGIN ───────────────────────────────────────────────────
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send("Invalid credentials");

  // 👇 THIS line is where the magic happens.
  // The first time you write to req.session, the library:
  //   1. Calls crypto.randomBytes(24) internally → generates "9f3a1b8c..."
  //      (this is the random session ID)
  //   2. Signs it with "super-secret-key" using HMAC
  //   3. Stores { userId: 42 } in the MemoryStore, keyed by "9f3a1b8c..."
  //      → i.e. sessions["9f3a1b8c..."] = { userId: 42 }
  //   4. Adds "Set-Cookie: connect.sid=s%3A9f3a1b8c....sig" to the response
  req.session.userId = user.id;

  res.send("Logged in");
  // 👆 When res.send runs, the cookie is actually sent to the browser.
});


// ─── PROTECTED ROUTE ─────────────────────────────────────────
app.get("/me", (req, res) => {
  // Before this handler runs, the session() middleware already:
  //   1. Read the "connect.sid" cookie off the request
  //   2. Verified its signature with "super-secret-key"
  //      (if tampered, req.session would be empty)
  //   3. Took the ID "9f3a1b8c..." and looked it up in the MemoryStore
  //      → i.e. const data = sessions["9f3a1b8c..."]
  //   4. Attached the stored data to req.session
  //
  // So req.session.userId === 42 here — without you doing anything.

  if (!req.session.userId) return res.status(401).send("Not logged in");

  const user = users.find(u => u.id === req.session.userId);
  res.json({ username: user.username });
});


// ─── LOGOUT ──────────────────────────────────────────────────
app.post("/logout", (req, res) => {
  // This tells the library to:
  //   1. Delete "9f3a1b8c..." from the MemoryStore
  //   2. Clear the cookie on the client
  req.session.destroy(() => res.send("Logged out"));
});
```

**Flow:**
1. Browser sends `username` + `password` to `/login`.
2. Server verifies, stores `{ userId: 42 }` in the session store (here: Node's RAM), sends back a cookie like `connect.sid=9f3a1b8c...`.
3. On `/me`, the browser sends the cookie automatically. Server looks up `9f3a1b8c...` in its MemoryStore → finds `{ userId: 42 }` → returns the user.

**Mental model:** you only ever write 3 lines of "session code":
- `req.session.userId = user.id` → creates the session (login)
- `req.session.userId` → reads it (any protected route)
- `req.session.destroy()` → kills it (logout)

Everything else — generating the random ID, signing it, parsing cookies, looking up the store, setting `Set-Cookie` headers — is done by `express-session` because of that one `app.use(session({...}))` line at the top.


## JWT Example

The server doesn't store anything. It hands out a signed token; the client sends it back on every request.

```js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "super-secret-key"; // used to sign/verify tokens

// Fake user DB
const users = [{ id: 42, username: "vasil", password: "1234" }];

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send("Invalid credentials");

  // Pack user info INTO the token itself
  const token = jwt.sign({ userId: user.id, username: user.username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware: verify the token on every request
function auth(req, res, next) {
  const header = req.headers.authorization; // "Bearer <token>"
  if (!header) return res.status(401).send("No token");

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, SECRET); // decoded payload
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

// Protected route
app.get("/me", auth, (req, res) => {
  // No DB lookup needed — the data is inside the token
  res.json({ username: req.user.username });
});
```

**Flow:**
1. Browser sends `username` + `password` to `/login`.
2. Server verifies, signs a JWT containing `{ userId: 42, username: "vasil" }`, sends it back.
3. On `/me`, the client sends `Authorization: Bearer eyJhbGci...`. Server verifies the signature with `SECRET` and reads the payload directly — no session lookup, no DB hit.


## Side-by-side summary

| Aspect            | Cookie / Session                            | JWT                                           |
|-------------------|---------------------------------------------|-----------------------------------------------|
| Where state lives | On the server (RAM / Redis)                 | On the client (inside the token)              |
| Sent to client    | A session ID (e.g. `abc-123`)               | A signed token containing the user data       |
| To verify         | Look up the ID in the session store         | Verify the token's signature with a secret    |
| Logout            | Easy — delete the session server-side       | Harder — token is valid until it expires      |
| Scaling           | Needs shared session store across servers   | Stateless — any server with the secret works  |