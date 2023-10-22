# The core concept of OOP is to separate concerns and responsibilities into entities.

## The Four Principles of OOP

### Inheritance

- create classes based on other classes using **extends** and **super()**:

```sh
class Enemy {
    constructor(power) {
        this.power = power
    }

    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power) {
        super(power)
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
}
```

super()

Notice that we use super to transfer the Enemy's class property explicitly. This is because that way we impose that **the superclass properties must be intialized first**, we have to do that manually and it is a rule. Methods are inherited automatically. Mind that if we want to override a methods -> that is polymorphism, see Polymorphism section.




### Encapsulation

- Encapsulation stands for an object's capacity to "decide" which information it exposes to "the outside" and which it doesn't. It is useful in cases where we need certain properties or methods for the inner working of the object, but we don't want to expose that to the exterior. Encapsulation is implemented through public and private properties and methods. By default all objects' properties and methods are public, so we need to use a special **#** syntax to mark private ones:

```sh
class Alien extends Enemy {
    #birthYear // We first need to declare the private property, always using the '#' symbol as the start of its name.

    constructor (name, phrase, power, speed, birthYear) {
        super(name, phrase, power, speed)
        this.species = "alien"
        this.#birthYear = birthYear // Then we assign its value within the constructor function
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    howOld = () => console.log(`I was born in ${this.#birthYear}`) // and use it in the corresponding method.
}
    
// We instantiate the same way we always do
const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50, 10000)
```

Mind that we can access the alien1.howOld() method even though it uses the private #birthYear property, but we cannot access the alien1.birthYear property.

### Abstraction

- This principle is closely related to encapsulation because it emphasizes to only expose information to the outside the properties and methods that you're going to use, if not needed, don't expose it.

### Polymorphism

- It is the cability of one method to return different values according to certain conditions.

There is parameter-based one:

```sh
const alien2 = new Alien("Lien", "Run for your lives!", 15, 60)
const bug1 = new Bug("Buggy", "Your debugger doesn't work with me!", 25, 100)

alien2.sayPhrase() // output: "Run for your lives!"
bug1.sayPhrase() // output: "Your debugger doesn't work with me!"
```

There is inheritance-based, where the subclass overrides the superclass method:

```sh
class Enemy extends Character {
    constructor(name, phrase, power, speed) {
        super(speed)
        this.name = name
        this.phrase = phrase
        this.power = power
    }
    sayPhrase = () => console.log(this.phrase)
    attack = () => console.log(`I'm attacking with a power of ${this.power}!`)
}


class Alien extends Enemy {
    constructor (name, phrase, power, speed) {
        super(name, phrase, power, speed)
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    attack = () => console.log("Now I'm doing a different thing, HA!") // Override the parent method.
}

const alien1 = new Alien("Ali", "I'm Ali the alien!", 10, 50)
alien1.attack() // output: "Now I'm doing a different thing, HA!"
```

https://www.freecodecamp.org/news/object-oriented-javascript-for-beginners/