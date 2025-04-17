**basic Express.js MVC example**, with clear distinctions between **Model**, **View**, and **Controller** components.

---

### 🗂 Project Structure

```
express-mvc-example/
│
├── app.js                 # Entry point
├── controllers/
│   └── userController.js  # Controller
├── models/
│   └── userModel.js       # Model
├── routes/
│   └── userRoutes.js      # Routes (optional in MVC, good for separation)
├── views/
│   └── user.ejs           # View (using EJS)
└── package.json
```

---

### 📁 `models/userModel.js` – **Model**
```js
// Simulating a DB with in-memory data
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

exports.getAllUsers = () => users;

exports.getUserById = (id) => users.find(user => user.id === id);
```

---

### 📁 `controllers/userController.js` – **Controller**
```js
const User = require('../models/userModel');

exports.listUsers = (req, res) => {
  const users = User.getAllUsers();
  res.render('user', { users }); // Sending data to the view
};

exports.getUser = (req, res) => {
  const user = User.getUserById(Number(req.params.id));
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
};
```

---

### 📁 `views/user.ejs` – **View**
```ejs
<!DOCTYPE html>
<html>
<head><title>User List</title></head>
<body>
  <h1>Users</h1>
  <ul>
    <% users.forEach(user => { %>
      <li><%= user.name %></li>
    <% }); %>
  </ul>
</body>
</html>
```

---

### 📁 `routes/userRoutes.js` – Optional helper for route separation
```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);

module.exports = router;
```

---

### 📄 `app.js` – Entry point
```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

---

### Summary of MVC Roles:

| Part | File | Role |
|------|------|------|
| **Model** | `models/userModel.js` | Handles data (simulates database interactions) |
| **View** | `views/user.ejs` | Renders data into HTML |
| **Controller** | `controllers/userController.js` | Handles logic, connects model and view |
| **Router (Optional)** | `routes/userRoutes.js` | Organizes route logic |

---

Want me to turn this into a real GitHub-ready boilerplate or expand it with a real DB like MongoDB or Sequelize?