### We need to wrap a DB return in a promise

Using Promise.resolve:
```js
function fetchData() {
  return Promise.resolve('Data fetched');
}
```
Using async/await:
```js
async function fetchData() {
  return 'Data fetched'; // Implicitly wrapped in a Promise
}
```
Both functions return a promise that resolves with the string 'Data fetched'. **The async keyword automatically wraps the return value in a Promise.resolve(), making the function return a promise.** This allows you to use await to pause the execution until the promise is resolved, providing a cleaner and more intuitive way to handle asynchronous operations.

Resolved in

FE:
```js
async function displayData() {
  try {
    const data = await fetchData(); // Waits here until fetchData resolves
    console.log(data); // 'Data fetched'
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
```

BE:
```js
app.get('/data', async (req, res) => {
  try {
    const data = await fetchData(); // Waits here until fetchData resolves
    res.send(data); // Sends 'Data fetched' to the client
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
```
