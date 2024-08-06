There are two ways to init a database - named and anonymous class. The named class has control over wether you create a single (Singleton pattern) or multiple instances. That is due to the very neture of being able to call the named class SingletonDNDatabase.getInstance() and have a checker if (!SingletonDNDatabase.instance){}. **But REMEMBER that whatever class init method you use, as long as you call the class one, it does not matter, you will have only one instance.**

- named class:
```js
class DNDatabase {
    constructor() {
        this.value = 42;
    }

    getValue() {
        return this.value;
    }
}

// Multiple instances
const db1 = new DNDatabase();
const db2 = new DNDatabase();

console.log(db1 === db2); // false
console.log(db1.getValue()); // 42
console.log(db2.getValue()); // 42

// Singleton pattern
class SingletonDNDatabase {
    static instance = null;

    constructor() {
        if (SingletonDNDatabase.instance) {
            throw new Error("Use SingletonDNDatabase.getInstance() to get the single instance of this class.");
        }
        this.value = 42;
    }

    static getInstance() {
        if (!SingletonDNDatabase.instance) {
            SingletonDNDatabase.instance = new SingletonDNDatabase();
        }
        return SingletonDNDatabase.instance;
    }

    getValue() {
        return this.value;
    }
}

const singletonDb1 = SingletonDNDatabase.getInstance();
const singletonDb2 = SingletonDNDatabase.getInstance();

console.log(singletonDb1 === singletonDb2); // true
console.log(singletonDb1.getValue()); // 42
console.log(singletonDb2.getValue()); // 42
```

- anonymous class => new (class{})():

```js
const instance1 = new (class {
    constructor() {
        this.value = 42;
    }

    getValue() {
        return this.value;
    }
})();

const instance2 = new (class {
    constructor() {
        this.value = 42;
    }

    getValue() {
        return this.value;
    }
})();

console.log(instance1 === instance2); // false
console.log(instance1.getValue()); // 42
console.log(instance2.getValue()); // 42
```