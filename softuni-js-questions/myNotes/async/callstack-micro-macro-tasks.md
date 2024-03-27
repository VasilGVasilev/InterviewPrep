const promise = new Promise(resolve => {
    resolve("Promise")
})
// callback on its own will not go into macrotask queue, it will be executed immediately, putting it in a special API as setTimeout will make it go into macrotask queue
function fetchData(cb) {
    setTimeout(() => { cb(), 1000 });
}

function processData() {
    console.log('Callback says hello');
}

promise.then(res => console.log(res))
console.log('first');
fetchData(processData);
console.log('last');

// Output:
// first
// last
// Promise
// Callback says hello