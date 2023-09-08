// Object create

let a = new Object()
let b = Object.create(null);

// Constructor function
function Person (name) {
    this.name = name;
}
let john = new Person('john')
console.log(john);

// Class syntax
class Dog {
    constructor (name) {
        this.name = name;
    }
}

let bauwi = new Dog('bauwi')
console.log(bauwi);


