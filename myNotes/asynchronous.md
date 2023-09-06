Javascript is a synchronous programming language, but we need to apply async programming when dealing with data, due to fetching latency of website to server with DB.
To achieve async programming we make use of callbacks -> promises -> async / await.


**Callbacks**

```sh
function fetchData(callback) {
  setTimeout(function () {
    const data = 'Async data';
    callback(data); // Execute the callback function with the data
  }, 1000);
}

function processData(data) {
  console.log('Received data:', data);
}

fetchData(processData); // Pass the processData function as a callback
console.log('Fetching data...');
```

Line of execution:

console.log('Fetching data...'); // This line is executed first.

Inside the fetchData function:
1. setTimeout is called with a delay of 1000 milliseconds.
2. While waiting for the timeout, the program continues executing.

After 1000 milliseconds (1 second):
3. The callback function processData is executed with the data 'Async data'.
4. Inside processData, the statement console.log('Received data:', data); is executed.

So, the final order of printing statements is:
1. "Fetching data..."
2. "Received data: Async data"

You see that fetchData is executed and the callback process triggered, yet, before it's finish the subsequent console.log('Fetching data...') is executed.
Why does it work that way?
How does Javascript 'know' to continue interpreting code even after it encountered a callback function(which seems to be executing simultaneoulsy /async/)?

JavaScript continues interpreting code after encountering a callback function due to its event-driven, single-threaded, and non-blocking nature. Here's how it works:

    Event Loop and Event Queue:
    JavaScript uses an event loop to manage asynchronous operations. The event loop continuously checks the event queue for tasks to execute. When an asynchronous task is completed, it's placed in the event queue.

    Callback Registration:x
    When you pass a callback function as an argument to an asynchronous function (e.g., a timer, an AJAX request, or a file read operation), the callback function is registered to be executed when the asynchronous task is finished. The JavaScript runtime doesn't execute the callback immediately; it schedules it to be executed later.

    Non-Blocking Execution:
    While waiting for the asynchronous task to complete, the JavaScript engine doesn't block the entire program's execution. Instead, it continues interpreting and executing other code that follows the asynchronous function call.

    Event Loop Iteration:
    The event loop continuously checks the event queue for completed tasks. When it finds a task, such as the completion of an asynchronous operation, it dequeues the task and executes the associated callback function.
        If there are multiple tasks in the event queue, they are executed one by one in the order they were added.

    Continuation of Execution:
    After executing the callback function, the JavaScript runtime resumes the execution of the code following the asynchronous function call. This allows you to handle the results of the asynchronous operation or perform other tasks based on that data.