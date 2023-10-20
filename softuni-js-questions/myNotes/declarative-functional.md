# Programming paradigms

### Imperative Programming

It's called "imperative" because as programmers we dictate exactly what the computer has to do, in a very specific way. It's like a recipe for cake with precise instructions for each actions.

```sh
const nums = [1,4,3,6,7,8,9,2]
const result = []

for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 5) result.push(nums[i])
}

console.log(result) // Output: [ 6, 7, 8, 9 ]
```

Being detailed and specific in our instructions, and that's what imperative programming stands for.

### Procedural Programming

Procedural is a derivation of imperative programming - adding the feature of functions. It's like the case recipe, but instead a single list with all the instructions, we group some of them in functions:

pseudo-code
```sh
1- Pour flour in a bowl
2- Pour a couple eggs in the same bowl
3- Pour some milk in the same bowl
4- Mix the ingredients
5- Pour the mix in a mold
6- Cook for 35 minutes
7- Let chill

to this:

function pourIngredients() {
    - Pour flour in a bowl
    - Pour a couple eggs in the same bowl
    - Pour some milk in the same bowl
}

function mixAndTransferToMold() {
    - Mix the ingredients
    - Pour the mix in a mold
}

function cookAndLetChill() {
    - Cook for 35 minutes
    - Let chill
}

pourIngredients()
mixAndTransferToMold()
cookAndLetChill()
```

So procedural programming adds simplification and abstraction to imperative programming.


### Functional Programming

As per the name, this approach shift the focus entirely on functions. There are two key principles - functions are first-class citizens and pure functions. In functional programming, functions are treated as first-class citizens, meaning that they can be assigned to variables, passed as arguments, and returned from other functions. A function is pure when it does not rely on any external data (closures), has no side effects (console.logs) and has the same return if the input is the same.

```sh
function filterNums() {
    const nums = [1, 4, 3, 6, 7, 8, 9, 2];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 5) result.push(nums[i]);
    }

    return result;
}

console.log(filterNums()); // Output: [6, 7, 8, 9]

```

Using the functional approach we can assure the function doesn't modify anything outside its scope. 

### Declarative programming

Declarative programming is all about hiding away complexity and bringing programming languages closer to human language and thinking. 


```sh
const nums = [1,4,3,6,7,8,9,2]

console.log(nums.filter(num => num > 5)) // Output: [ 6, 7, 8, 9 ]
```

Also a simple React component:

```sh
<button onClick={() => console.log('You clicked me!')}>Click me</button>
```

JSX syntax (what React uses) mixes HTML and JS in the same thing, which makes it easier and faster to write apps. But that's not what browsers read and execute. React code is later on transpiled into regular HTML and JS, and that's what browsers run in reality.

JSX is declarative, in the sense that its purpose is to give developers a friendlier and more efficient interface to work with.

## Object-Oriented Programming

What if we want to have actual entities that execute the imperative or declarative programs? We use OOP. Expanding our cake recipe to have two classes cook and assistant cook whose instances are Frank and Anthony. By introducing OPP we introduces **separation of concerns and responsibilites** 

```sh
// Create the two classes corresponding to each entity
class Cook {
	constructor constructor (name) {
        this.name = name
    }

    mixAndBake() {
        - Mix the ingredients
    	- Pour the mix in a mold
        - Cook for 35 minutes
    }
}

class AssistantCook {
    constructor (name) {
        this.name = name
    }

    pourIngredients() {
        - Pour flour in a bowl
        - Pour a couple eggs in the same bowl
        - Pour some milk in the same bowl
    }
    
    chillTheCake() {
    	- Let chill
    }
}

// Instantiate an object from each class
const Frank = new Cook('Frank')
const Anthony = new AssistantCook('Anthony')

// Call the corresponding methods from each instance
Anthony.pourIngredients()
Frank.mixAndBake()
Anthony.chillTheCake()
```


[see this](https://www.freecodecamp.org/news/an-introduction-to-programming-paradigms/#object-oriented-programming) 