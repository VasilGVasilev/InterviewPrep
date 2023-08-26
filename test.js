function Person (name){
    this.name = name;
}

let john = new Person('John')

let a = new Object()
let b = Object.create(null);