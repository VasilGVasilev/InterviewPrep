# Cookie setup

The frontend does nothing special to handle cookies, the backend does. Here’s how it works:

1. Backend sends a Set-Cookie header:
    When the backend wants to create a cookie, it includes a Set-Cookie header in its HTTP response.

2. Browser receives the Set-Cookie header:
    The browser is programmed to look for this header. When it sees it, it stores the cookie according to the rules in the header (domain, path, expiry, etc.).

3. Browser automatically sends the cookie:
    For every future HTTP request to the same domain and path, the browser automatically includes the cookie in the Cookie header—no code needed on the frontend.

Summary:
    The browser’s built-in HTTP handling takes care of cookies. The frontend doesn’t need to do anything unless you want to read or manipulate cookies with JavaScript.

ex. node/express and react

### BE

MIND that this example has simple nonproduction example of storing the session object in memory on the server via express-session. If you want industry standard storing - add redis so the session does not depend on the server being down.


npm install express-session cors

```js
// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

// 1. Configure CORS to allow cookies from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true 
}));

app.use(express.json());

// 2. Session Middleware
app.use(session({
  secret: 'your-very-secret-key', // Used to sign the session ID cookie
  resave: false,                 // Don't save session if unmodified
  saveUninitialized: false,      // Don't create session until something is stored
  cookie: {
    httpOnly: true,              // Prevents JS from reading the cookie (Security!)
    secure: false,               // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24  // 24 hours
  }
}));

// 3. Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Real-world: Validate against a database
  if (username === 'admin' && password === 'password') {
    // Store user info in the server-side session
    req.session.user = { id: 1, username: 'admin' };
    return res.json({ message: 'Logged in successfully' });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
});

// 4. Protected Route (Checks if session exists)
app.get('/api/dashboard', (req, res) => {
  if (req.session.user) {
    res.json({ message: `Welcome back, ${req.session.user.username}` });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

This is the same example beginning just with Redis added:

npm install express-session connect-redis redis cors

```js
// ...existing code...
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const app = express();

// 1. Configure CORS to allow cookies from the frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

app.use(express.json());

// 2. Setup Redis client
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

// 3. Session Middleware with Redis store
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-very-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// ...rest of your code...
```


### FE


```js
// App.js
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      // CRITICAL: This tells the browser to store/send the cookie
      credentials: 'include', 
    });

    if (response.ok) {
      setUser(username);
      alert('Logged in!');
    }
  };

  const checkSession = async () => {
    const response = await fetch('http://localhost:5000/api/dashboard', {
      credentials: 'include',
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: '20px' }}>
      {!user ? (
        <div>
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>User: {user}</h2>
          <button onClick={checkSession}>Access Protected Data</button>
        </div>
      )}
    </div>
  );
}

export default App;
```


### in the browser cookie tab you have an id that relates to the session object in the session store on the server:



- In Node.js: It's literally a JavaScript object sitting in a variable managed by the express-session library (with Redis possibly).

- In Symfony/PHP: It's an array stored in a temporary file (usually in /var/lib/php/sessions) or in a database (with Redis possibly).


The Browser ->	The Cookie ->	A simple, unique string (The Key).	**Ex.** connect.sid = "s:A192B..."
The Server ->	The Session Object -> A data structure in memory (The Cabinet).	**Ex.** { "user_id": 42, "role": "admin" }

Both key and cabinet:

```js
// A conceptual look at the Server's Memory
const sessionStore = {
  "s:A192B...": { user_id: 42, username: "Alice", lastAccess: "10:00 AM" },
  "s:Z998X...": { user_id: 10, username: "Bob", lastAccess: "10:05 AM" },
  "s:K443P...": { user_id: 5, username: "Charlie", lastAccess: "09:45 AM" }
};
```