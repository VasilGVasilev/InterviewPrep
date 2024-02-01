The following is an explanation of how we make the sync javascript async. The short answer is via its environment. Callbacks and promises do not make async logic by themselves. They are instruments that the APIs that come with a javascript enviroment use. Wihtout the Timer API and wrapping our callback in a .setTimeout(), we will not have an async operation. Unlike callbacks that are tools that our tools (APIs) use, promises can be put into our code just by themselves and still follow the line of execution (first call stack is cleared then microtasks are put back into the callstack by the event loop), but this happens due to promise coming with its own constructor.


Javascript is a synchronous programming language, but we need to apply async programming when dealing with data, due to the fetching latency of website to server with DB.
To achieve async programming we make use of callbacks -> promises -> async / await.

The basic thing about Javascript is that it is **synchronous** and this causes blocking if a certain code block requires a lot of time to process:
```sh
console.log('first')
for(let i = 0; i < 100000000; i++){
  for(let j = 0; j < 100000000; ij++){
    console.log(j)
  }
}
console.log('last')

```

Last will be logged out after the nested for loops finish executing if they don't crash the app.

A real life scenario for such blocking is some data to be fetched and implemented in a website. If we have to wait for the line of code to execute that has the necessary data used to populate the website, we will have bad user experience. Instead we should show the whole website even if parts are missing, thus, execution should not be blocked, and then the website be hydrated with the awaited data.

But how does this happen since Javascript is synchronous. It only has one thread to execute all processes.

We need an environment to run javascript in. A browser or node js -> runtime environments.

Node.js has the main thread, but also 'places' where we can execute async logic. We can 'put' our logic that would otherwise block the main thread and thus, aschieve non-blocking behaviour.  

But what are those places? Most articles re-iterate callbacks, promises, async/await logic without actually explaining.

Callbacks in themselves are function that are used as arguments of other functions, so the following code:
```sh
function fetchData(callback) {
  callback(); 
}

function processData() {
  console.log('Callback says hello');
}

callback('first')
fetchData(processData);
callback('last')
```

Uses callbacks, but that does not inherenlty mean we are going to have async logic in it. 
The line of execution will be :
first
callback says hello
last

This is due to javascript being synchronous and callbacks having no inherent ability to make something async.
When people use callbacks in their articles as a 'way to handle async logic', it is misleading. Async logic requires first and foremost a javascript runtime environment. We need a main thread, an event queue, a callstack queue, a microtask a macrotask queue, a web api and more. 

The right approach is - what operation do we want to make async. For example, our nested loop:
```sh
console.log('first')
for(let i = 0; i < 100000000; i++){
  for(let j = 0; j < 100000000; ij++){
    console.log(j)
  }
}
console.log('last')
```

We cannot just make some callback function that executes this nested for loop be put in some other function and say - we made it async. 

**Async functionality comes with the runtime and the provided APIs.**

```sh
console.log('first')
setTimeout(function () {
  for(let i = 0; i < 100000000; i++){
    for(let j = 0; j < 100000000; ij++){
      console.log(j)
    }
  }
}, 1000);

console.log('last')
```

The line of execution of the above code will be:
first
last
0
1
2
....

The reason for that is that we have used setTimeout which is one of the ways to make certain logic async. In it we pass on a callback function (containing our nested for loops). In this sense, yes, callbacks are a way to make async operations, but it is merely the instrument that our actual instrument uses.

Promises are different:

```sh
const promise = new Promise(resolve => {
    resolve("Promise says hello")
})
function fetchData(callback) {
    callback();
}

function processData() {
    console.log('Callback says hello');
}

promise.then(res => console.log(res))
console.log('first');
fetchData(processData);
console.log('last');
```

the line of execution will be:

first
Callback says hello
last 
Promise says hello





























OLD IDEAS:


**Callbacks**

```sh
function fetchData(callback) {
  setTimeout(function () {
    const data = 'Async data';
    callback(data); // Execute the callback function with the data
  }, 1000);
}

function processData(data) {
  console.log('Received data: ', data);
}

fetchData(processData); // Pass the processData function as a callback
console.log('Fetching data...');


```

Line of execution:

console.log('Fetching data...'); // This line is executed first.
console.log('Received data: Async data'); // This line is executed second.


Inside the fetchData function:
1. setTimeout is called with a delay of 1000 milliseconds.
2. While waiting for the timeout, the program continues executing.

After 1000 milliseconds (1 second):
3. The callback function processData is executed with the data 'Async data'.
4. Inside processData, the statement console.log('Received data:', data); is executed.

So, the final order of printing statements is:
1. "Fetching data..."
2. "Received data: Async data"

So the "Fetching data..." console.log executes before the fetchData function.

How is this possible? How does Javascript know to continue interpreting the code and arrive at the console.log, even though it has another task seemingly on standby with fetchData function.
My problem came from the emphasis in numerous text that Javascript is single-threaded. It seemed to me that this is countra-intuitive. How can it be single-threaded and still have several simultaneous processes running in the form of callbacks (or promises) and still continue with the execution of the code. Well, to understand Javascript, one must deep dive into its actual process of work. Javascript can only run on a Javascript runtime. That runtime could be a browser or Node.js, but this runtime equips pure Javascript code with a few more functionalities rather than just a basic line by line interpreter of code.

The Javascript runtime consists of the JS engine and, mind the following to be crucial -> event loop and Web API (enabling async logic).

When we say single threaded we refer to the execution mechanism of the JS engine. The Javascript engine is responsible for the  memory heap and the call stack. The memory heap stores all the variables defined in our JS code while the call stack performs the operations (function execution) (side note is that the engine manages the execution context on the basis of call stack and memory heap). 

So, back to the current problem, single threaded means only one call stack. One call stack, in turn, means only one piece of code can be executed at a time. 
In our case with console.log('Fetching data...') and fetchData function, given the nature of Javascript to be non-blocking, Javascript does not wait for the response of the callback, but moves on with the interpretation of the subsequent blocks of code.
Finally, the answer -> the callback is 'extracted' from the JS engine flow of execution onto a separate thread. Thus, concurrency becomes possible. 
But where is this callback 'extracted'?
The general answer is that any such asynchronious function utilizes the Web API by relying on the event loop to manage its queue priority to re-enter the Javascript engine event cycle.
In the case of callbacks, the Timer Web API sets the setTimeout as a task in the task queue. This queue is managed by the event loop which awaits for the call stack to be cleared of any functions and then proceeds to add the callback set as a task in the queue. That is why the delay set in setTimeout is also known as minimum delay time. Because it is unclear when the call stack will be freed up exactly so that a new event cycle can be executed.

**Promises**

```sh
const promise = new Promise(resolve=>{
  resolve("Promise")
}, reject => {

})

promise.then(res=>console.log(res))
```

In the case of promises, the promise is set into the microtask queue which the event loop ranks with higher priority than regular tasks such as setTimeout callbacks. Meaning when/if a promise is fulfilled, its then method is added to the microtask queue, ensuring that it will be executed before the next task in the event loop.

Thus, with simple words, the Javascript runtime adds threads and concurrency to the otherwise, single threaded programming language.
So what happens when we utilize promises and callbacks -> we invert the control. The code result becomes dependant on an external factor, namely, the additional features that come with every Javascript runtime. Control of execution is inverted and handed over to an external entity as described above.


\
\
\
\
\


see this [article](https://medium.com/@monuchaudhary/single-threaded-non-blocking-asynchronous-and-concurrent-nature-of-javascript-a0d5483bcf4c)

What happens when you run a JavaScript code?

JavaScript code runs on a JavaScript runtime — browser that you use. JavaScript runtime uses JavaScript engine which converts the JavaScript code to machine code. JavaScript engine for Chrome and node is V8, for Mozilla — SpiderMonkey, for Safari — Nitro, and for IE — Chakra.

JavaScript engine consists of a memory heap and a call stack. The memory heap stores all the variables defined in our JavaScript code while the call stack performs the operations (function execution). JavaScript runtime provides additional features such as event listeners, HTTP/AJAX requests, or timing functions, etc. to support execution of the JavaScript code.
JavaScript Runtime Architecture

    JavaScript is single threaded, non-blocking, asynchronous and concurrent programming language.

As we look into the JavaScript definition, we will find that JavaScript is Single Threaded which implies that it only has one Call Stack. One Call Stack implies only one piece of code can be executed at a time. When a function is pushed into the call stack, then the execution context of the JavaScript code is the function on the top of the call stack.
Call Stack (reference taken from https://youtu.be/8aGhZQkoFbQ)

JavaScript is also known for it’s non-blocking behavior. Non-blocking means that JavaScript doesn’t wait for the response of an API call, an Ajax request, an I/O event or a timer but moves on with the other block of code below it. But how is JavaScript non-blocking when it only has one thread? The answer is that these requests are performed by web APIs (C++ library in case of node) which has its own thread. This makes concurrency possible in JavaScript.

As we know, when a function with asynchronous callback is called, the function call is pushed to the Call Stack. And, when an asynchronous call is made to the Web API within that block of function, the request is transferred to the web APIs and the function call is popped out of the call stack. A new task is then pushed to the call stack and is executed. Meanwhile, the Web API performs the request.

On the Web API side, on completion of the HTTP request, the callback function is sent to the callback queue (event queue). These callback functions stay in the callback queue as long as the Call Stack is not empty. Once the call stack becomes empty, the callback function at the beginning of the callback queue is pushed to the call stack and the JavaScript engine starts executing that block of the callback function.

    Callback queue is simply a staging area where the callback functions are waiting to be invoked and moved over to the call stack.

How does the runtime knows that the call stack is empty and how is the events in the callback queue invoked? All of these are performed by an Event Loop.
JavaScript Runtime for Chrome

    Event Loop is a process that constantly keeps on checking if the call stack is empty and if it is, it checks whether there is an event in the callback queue waiting to be invoked.

Event loop moves the first event from the even queue to the empty call stack. The event loop keeps on running indefinitely even if the callback queue is empty (but this is not the case in node).
Event loop and Asynchronous Callback (reference taken from https://youtu.be/8aGhZQkoFbQ)
Conclusion

    JavaScript is single threaded because it has only one call stack where the function is executed.
    Execution context is the function on the top of the call stack which is being executed at the moment.
    JavaScript is non-blocking because the slow processes which require call to the Web API are executed in the Web API leaving the call stack open for other function execution.
    JavaScript is executed concurrently because the Web API handles the calls made to it while the JavaScript engine keeps executing other block of the code.
    JavaScript, though it is synchronous, behaves asynchronously because the web API adds the callback to the callback queue (event queue) which then pushes the callback to the call stack for execution.
    Event loop checks for the events in the callback queue and pushes it to the empty call stack.

