Decorators were a highly anticipated feature both in ECMAscript and Typescript. Initially, TS was supposed to be a niche programming language, but Microsoft converged with Google to create Angular, which uses ts (angular was supposed to be with its own typed language, but google relied on microsoft experise). One of the features that became notorious was decorators. TS implemented decorators without agreeing with TC39, thus, had them before JS. They were faulty pieces of software.

what is the purpose of decorators?

To Decorate a function in the codebase without altering the original code.
We apply a decorator to the function that adds functionality. The same is actually achievable via higher-order functions, since they accept and return functions:

```sh
function customDecorator(func) {
  return function(...args) {
    console.log(`Calling function ${func.name} with args ${args}`);
    const result = func(...args);
    console.log(`Function ${func.name} returned ${result}`);
    return result;
  };
}

const myFunction = customDecorator((arg) => arg * 2);

console.log(myFunction(10));
```

A decorator merely provides syntaxis sugar for the above abstraction:

```sh
function log(message) {
  console.log(message);
}

function decorator(func) {
  return function(...args) {
    console.log(`Calling function ${func.name} with args ${args}`);
    const result = func(...args);
    console.log(`Function ${func.name} returned ${result}`);
    return result;
  };
}

@decorator
function myFunction(arg) {
  return arg * 2;
}

console.log(myFunction(10));
```

You can see how with the @decorator syntax we can actually apply the decorator when needed only

Decorator example
```sh
function decorator(fn){
    return function(){
        console.log('Hello, world!')
        const result = fn();
        return result;
    }
}


@decorator
function myName(){
    console.log('Vasil')
}

myName()
```


BUT to use decorators, you need to use a transpiler such as Babel or TypeScript.

HOF example
```sh
function decorator(fn){
  return function(){
      console.log('Hello, world!')
      const result = fn();
      return result;
  }
}


const myName = decorator(() =>console.log('Vasil'))

myName()
```