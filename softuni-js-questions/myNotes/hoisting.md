Clear out semantics:

- Function definition refers to the body of a function
```javascript
{

}
```

- Function declaration /name is declared/:
```javascript
function greet(){}
```

- Function expression /name is omitted/:
```javascript
const greet = function(){}
```

Hoisting is not a universally agreed upon term but it is refering to JavaScript's default behavior of moving all declarations to the top of the current scope.

Variables:

- declared with var
```sh
message = 'The variable Has been hoisted'; //initialisation
console.log(message); //execution
var message; //declaration
```

The JS engine creates a global execution context which consists of memory component and execution component. The interpreter goes through each line of the code and in our above example sets **message** variable as undefined since only delcaration is hoisted, not initiliaziation. Then sets the console.log function in the memory component, but also creates a local execution context for the function with its own memory component that sets **message** as undefined. Then sets the **message** variable declaration in the memory component, too. Finally, the execution phase starts, meaning the engine turns to the exectution of the only function it created a local execution context for -> console.log(message).
The crucial point is that due to JS hoisting declarations, var is hoisted and when execution phase comes, the variable declaration is hoisted at the top, below it is the initialization and below that is the actual function and until the interpreter comes to its line, all necessary components (delcaration and intialization) are done.


- declared with let/const
```sh
message = 'The variable Has been hoisted'; //initialisation
console.log(message); //execution
let message; //declaration
```

The JS engine creates a global execution context which consists of memory component and execution component. The interpreter goes through each line of the code and in our above example sets **message** variable as undefined since only delcaration is hoisted, not initiliaziation. Then sets the console.log function in the memory component, but also creates a local execution context for the function with its own memory component that sets **message** as undefined. Then sets the **message** variable declaration in the memory component, too. Finally, the execution phase starts, meaning the engine turns to the exectution of the only function it created a local execution context for -> console.log(message).
The crucial point is that let/const declarations of variables are not hoisted and when execution phase comes, there is no variable declaration at the top, below it is the initialization and below that is the actual function. But declaration is missing so the console throws an Reference Error.

**In summary, var declarations are hoisted, let/const are not.** Yet, an error can still occur if the initialization is written after the line in which the function that uses that variable.

```sh
console.log(message); //Undefined or ReferenceError
message = 'The variable Has been hoisted'; //initialisation
var/let/const message; //declaration
```

- functions

Given the last bold text *var declarations are hoisted, let/const are not*, we can build on that and remind ourselves that function expressions are actually functions stored in variables, usually let/const. So the rule presides - let and const do not hoist declarations

**function expressions**

```sh
sayHello() // ReferenceError

const sayHello = function () {
  console.log("Hello")
}
```

Inversly, **function declarations** are hoisted, since functions are pasted in full in memory component of execution contexts:

```sh
sayHello() // Hello

function sayHello () {
  console.log("Hello")
}
```

Mind also that assigning a value to an undeclared variable implicitly creates it as a global variable when the assignment is executed.

```sh
function hoist() {
  a = 20;
  var b = 100;
}

hoist();

console.log(a); // output: 20

console.log(b); // Output: ReferenceError: b is not defined
```