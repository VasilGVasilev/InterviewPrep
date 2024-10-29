First, it is important to start with the fact that the difference between classes and objects in js is relatively weak, as js is prototype based and classes are merely syntax sugar. Meaning we can, in fact, use a class as an object without relying on its inheritance functionality:

```js
../DNDatabase.js
const DNDatabase = new (class { 
  initBool = false;

  changeInit() {
    this.initBool = true;
  }
})();


../index.js
import DNDatabase

DNDatabase.changeInit()
```

It is vital to know that we achieve this by making only one instance of the anonymous class after **new** keyword and within **()**. You can still use inheritance and make another instance or not and basically treat **DNDatabase** as an object that has its properties and methods allocated in memory.

```js
../DNDatabase.js
const DNDatabase = new (class { 
  initBool = false;

  changeInit() {
    this.initBool = true;
  }
})();

class UserDatabase extends DNDatabase {
    constructor() {
        super();
    }
    addUser = async (username, password, broker = 0, userdata = '') => {
        const query = 'INSERT INTO user (username, password, broker, userdata) VALUES (?, ?, ?, ?)';
        await this.executeSQL(query, [username, password, broker, userdata]);
    };
}

../index.js
import DNDatabase

const userDb = new UserDatabase();
userDb.changeInit();
userDb.addUser();
```
