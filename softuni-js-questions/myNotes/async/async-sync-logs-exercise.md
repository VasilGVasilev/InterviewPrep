```sh
Promise.resolve().then (() => console.log(1));
queueMicrotask(() => console.log(2));
setTimeout (() => console.log(3), 0);
console.log(4) ;
new Promise(() => console.log(5));
(async () => console.log(6))()
```
4 -> 5 -> 6 -> 1 -> 2 -> 3

The selected JavaScript code demonstrates the concept of the event loop and the execution order of different types of tasks in JavaScript. It includes promises, microtasks, timers, and synchronous code.

The first line creates a resolved promise and attaches a then callback to it. This callback is scheduled as a microtask, which means it will be executed after the current execution context is finished and before yielding back to the event loop.

The second line schedules a microtask using the queueMicrotask function. This microtask will also be executed before yielding back to the event loop, after the current execution context and any other microtasks that were scheduled before it.

The third line schedules a timer task using setTimeout. Even though the delay is set to 0, this doesn't mean the callback will be executed immediately. Instead, it will be executed in the next cycle of the event loop, after any microtasks.

The fourth line is a synchronous operation that logs 4 to the console. This will be executed immediately, before any of the tasks or microtasks.

The fifth line creates a new promise. The executor function of a promise is executed immediately, so it will log 5 to the console right away. However, any then callbacks attached to this promise would be scheduled as microtasks.

The last line is an immediately invoked async function. The body of an async function is executed synchronously up until the first await expression, but there are none in this function, so it will log 6 to the console immediately.

So, the output order will be 4, 5, 6, 1, 2, and then 3. The exact order might vary in different JavaScript environments, but in a typical environment like a browser or Node.js, this will be the order.

When we will return a promise that executes immediately:
```sh
new Promise(() => console.log(5));
```
In such a case:
```sh
new Promise((resolve) => {
    console.log(5);
    window.addEventListener('test', () => {
        resolve(5)
    })
});
```

In a Promise, the executor function (the function you pass to new Promise()) is executed immediately. However, the Promise itself is not considered "resolved" until the resolve() function is called. BUT there can be executor functions in a promise.


Mind that you can also have .then() chaining to execute some logic, just without actually passing any argument '_':

```sh
const toBeResovled = new Promise((resolve) => {
    window.addEventListener('test', () => {
        resolve(5)
    })
});

toBeResolved
    .then(r=>r.json())
    .then(r=>{
        if (r.data === 0){
            # todo
        }
    })
    .then(_ => {
        if (currentVariable) {
            console.log(5);
        }
    });
```
