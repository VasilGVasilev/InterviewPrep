## Threads

Is Javascript multithreaded?

We learn that javascript is a single-thread language, but in reality it behaves as a multithreaded one. This is because, javascript always needs an environment - node.js, browser, etc. This env provides the capability of offloading the main thread where the js executes onto background threads. The offloading is done via the event loop mechanism.

## callbacks

Why are callbacks a thing?

It's more of a semantic. A callback in itslef is just a function that is to be called back at a later time. However, in a straightforward javascript case /synchronious/, there is no later calling back, the function executes at the moment the interpreter is at it:

- A **callback** is a function that is passed as an argument to another function and is intended to be called (or "called back") at a later time, often after some operation completes.


**Synchronous callback:**
````javascript
function greet(name, callback) {
  console.log('Hello, ' + name);
  callback();
}

greet('Alice', () => {
  console.log('Greeting finished!');
});
````

**Asynchronous callback:**
````javascript
setTimeout(() => {
  console.log('This runs after 1 second');
}, 1000);
````

So here only the second asynchronous callback actually semantically works as such, because the essence of calling back later is to have some period elapse. In that sense. Callbacks are the way fundamental insturment of async operations in js, a more complex one is Promises.
Nothing in the callback structure makes them async, it is just the name we give of the function in that specific use case that is "call backing".

## heap/stack memory
Since the offloading happens for there to be non-blocking capability of js runtime envs, what is the case with some things happening on the stack, some on the heap memory.

Call stack:
- The call stack is where JavaScript keeps track of what function is currently running and what to return to after each function finishes.
- When you call a function, it’s pushed onto the stack; when it returns, it’s popped off.
- **primitives are stored, function calls are managed**

Heap:
- The heap is a large region of memory used for storing objects, arrays, and data that need to persist beyond a single function call.
- **complex data structures - objects, arrays and functions - are stored**

```js
// Main thread: This is where your JS code runs (call stack & heap)

// Example object stored in the heap
const user = { name: "Alice" }; // <-- stored in the heap

function greet() {
  // This function is pushed onto the call stack when called
  console.log("Hello, " + user.name); // Accesses heap for user object
}

function asyncOperation() {
  // Simulate an async operation (e.g., network request or timer)
  setTimeout(() => {
    // This callback is handled by a background thread (Web API)
    // After 1 second, it's pushed to the task queue, then call stack
    console.log("Async operation finished!"); // Runs on main thread
    greet(); // Also runs on main thread, uses call stack & heap
  }, 1000);
}

console.log("Start"); // Call stack: [console.log]
asyncOperation();     // Call stack: [asyncOperation]
console.log("End");   // Call stack: [console.log]

// Output:
// Start
// End
// (after 1 second)
// Async operation finished!
// Hello, Alice
```

## closures

Closure is a special js function that remembers its lexical enviroment, thus, the primitive count is also stored on the heap, aside from the overall makeCounter function.

```js
function makeCounter() {
  let count = 0; // This variable is in the outer scope
  return function() {
    count++; // The inner function "closes over" count
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## thunks

thunks in redux are using closure logic

```js
const setNewLangAsync = lang => async (dispatch, getState) => {
    if (getState().isThereUser.activ) {
        dispatch(setUserData({ lang: lang }));
        await User.setNewLang({ lang: lang });
    }
};
```

## Why is this a closure?
- The outer function setNewLangAsync takes lang as a parameter.
- It returns an inner function (async (dispatch, getState) => { ... }).
- The inner function can access lang even after the outer function has finished executing, because it "closes over" the lang variable.

## How does this work?
When you call setNewLangAsync('en'), you get back a function that remembers 'en' as the value for lang. When Redux later calls this function with dispatch and getState, it still has access to 'en'.

**NB** Functions and closures both live on the heap as long as they are accessible before they get garabage collected. The difference is that closures also have their lexical enviroment live with them.