### lexical scoping
It is vital for optimized code to organize your functions. Especially, if they are within some library's components. The basic rule is that in javascript, there is lexical scoping - functions can rely on values stored anywhere above them in the call stack:
```js
function evenOuter(){
    let outerVariable = 'I am outside!';
    return function outer() {
        
        return function inner() {
            console.log(outerVariable); // This forms a closure
        }
    }
}


evenOuter(); // 'I am outside!'
```

imagine it as the DOM tree whose branches go down to the last node. That node can access its parent and its parent's parent (prototype inheritance) until the very base of the DOM tree. It can access any method or value along the way up. **Excpetion** -> the only exception being if it has to access something out of a parallel branch even tho both have a common parent:

- ON PARALLEL BRANCH 🚫

```js
function evenOuter(){
    function anotherOuter() {
        let outerVariable = 'I am outside!';
        return function inner() {
            console.log(outerVariable); // This forms a closure
        }
    }
    function outer() {
        
        return function inner() {
            console.log(outerVariable); // This forms a closure
        }
    }
    return outer();
}


evenOuter(); // 'I am outside!'

```
- ON PARENT BRANCH ✅

```js
function evenOuter(){
    let outerVariable = 'I am outside!';
    function anotherOuter() {
        return function inner() {
            console.log(outerVariable); // This forms a closure
        }
    }
    function outer() {
        
        return function inner() {
            console.log(outerVariable); // This forms a closure
        }
    }
    return outer();
}


evenOuter(); // 'I am outside!'

```


### how are closures different?

closures rely on the above logic of lexical enviroment and are **a function bundled with its surrouning lexical enviroment**

Its the same thing as the above, we just have to bundle the function by storing it in a variable:
```js
function evenOuter(){
    let outerVariable = 'I am outside!';
    return function outer() {
        
        return function inner() {
            console.log(outerVariable); // This forms a closure
        }
    }
}


const bundledFunction = evenOuter(); 
bundledFunction() = // 'I am outside!'
```

this bundledFunction stores the function but also the outerVariable value which could be changed dynamically - it is due to closures being stored in the HEAP memory:

```js
function createCounter() {
    let count = 0; // This is the outer variable that the closures will capture

    return {
        increment: function() {
            count += 1;
            return count;
        },
        decrement: function() {
            count -= 1;
            return count;
        }
    };
}

const counter = createCounter();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.decrement()); // 0
```