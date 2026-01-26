# cookie vs jwt setup

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