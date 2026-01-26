Javascript executes synchroniously. Via APIs we have the ability to make some of the code asynchronious (delegate the task on another thread). But what does that mean?

**Natural flow of JS interpreter is to read and execute line by line** which means that if there is an operation that may take a lot of time, the execution of the whole code is stopped, in turn, **blocking the app**.

### The problem - long-lasting operations block the code.

### What do we do? -> rely on Promises (async illusion). 

How do Promises aliviate the situation? -> Instead of waiting for the value of the long-lasting operation, the code immediately recieves a pending promise that will be fulfilled or rejected. Thus, execution of code continues line by line. **The promise solves the blocking problem that the synchronious nature of JS causes**.

Mind that the blocks of code that are async, be that with .then() or async/await syntax are executed synchroniously, but the whole block is treated as if it is asynchronious in relation to the code.

------------------------------------------------------------
async/await
```js
console.log('A');
async function foo() {
  console.log('B');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('C');
}
foo();
console.log('D');
```

promise
```js
console.log('A');
function foo() {
  console.log('B');
  new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => {
      console.log('C');
    });
}
foo();
console.log('D');
```

- Async/await lets you write asynchronous code that looks synchronous.
- When you use await, the function "pauses" at that point until the awaited Promise resolves, but only inside that async function.
- Other code outside the async function keeps running—the main thread is not blocked.

Comment: Thus, if you have some effect like a conditional screen happen based on some specific Redux state value, you may experience flicker if the thunk is not in async await.
------------------------------------------------------------


[!img](https://github.com/VasilGVasilev/InterviewPrep/tree/main/softuni-js-questions/myNotesRevauxy/async-basics/async.png)


NB I say async illusion because we actually open up another thread by running js (which is only sync) onto an enviroment. It is by virtue of those other threads, the event loop that this async behavior is possible. Promises are one of the ways, another is callbacks, thus, the two types of callback and promise queues also known as macro- and mircotask queues.