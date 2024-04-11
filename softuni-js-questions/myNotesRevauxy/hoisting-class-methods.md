How is it that we can use the someFn function inside clear since clear stands above someFn?

In JavaScript, methods in a class are available to all other methods in the class, regardless of the order in which they are defined. This is similar to function hoisting, but it's not exactly the same thing.

```javascript
class Car {
    startEngine() {
        console.log("Engine started!");
        this.accelerate(); // This will not cause a ReferenceError
    }

    accelerate() {
        console.log("Car is accelerating!");
    }
}
```

Class method definitions are not actually hoisted. Instead, when a class is defined, all of its methods are added to the prototype of the class at the same time. This means that **all methods are available on instances of the class as soon as the instance is created**, regardless of the order in which the methods were defined in the class.