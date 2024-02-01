const promise = new Promise(resolve => {
    resolve("Promise")
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