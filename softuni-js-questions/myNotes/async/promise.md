[Best visualization of connection between promise resolve/reject and .then()](https://www.youtube.com/watch?v=Xs1EMmBLpn4)

[my own article](https://dev.to/vasilgvasilev/how-the-then-method-interacts-with-the-javascript-event-loop-146g)

![promise](https://github.com/VasilGVasilev/InterviewPrep/blob/main/softuni-js-questions/myNotes/async/promise-object.png)

The crucial part of understanding the how .then() and .catch() work with promises is reviewing the [[PromiseFulfillReactions]] and [[PromiseRejectReactions]]. 

For example the [[PromiseFulfillReactions]] has among others a PromiseReaction field with [[Handelers]], meaning what we put in the .then(). This field gets triggered when the promise is fulfilled. When does the promise get fulfilled -> when the acync operation that was in the task Queue gets pack in the call stack and is executed, as per the below example -> ()=>resolve('Done!').

So basically, we have an async operation, ex. setTimeout, it has the resolve of the Promise. When the async operation get back into the call stack and gets executed, the resolve of the promise gets executed, the Promise becomes fulfilled, it triggers the PromiseFullfillReaction Handler (which is the code inside .then()) and the string we pass in the resolve of the Promise (here, it is 'Done!') gets applied as an argument to the handler (here, result => console.log(result) ).
This is set onto the microTask Queue until the call stack is free and when it is free, it finally gets the actual agrument 'Done!' applied and gets executed.

```sh
new Promise((resolve) => {
    setTimeout(()=>resolve('Done!'), 100);
})
    .then(result => console.log(result))
```


# Full cycle:


## FE:
```sh
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fetch Example</title>
</head>
<body>
    <button id="get-data">Get Data</button>
    <div id="data-container"></div>

    <script>
        const getDataButton = document.getElementById('get-data');
        const dataContainer = document.getElementById('data-container');

        getDataButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                dataContainer.textContent = data.message;
            } catch (error) {
                console.error("Error fetching data:", error);
                dataContainer.textContent = "Failed to get data.";
            }
        });
    </script>
</body>
</html>
```

## BE:

```sh
const express = require('express');

const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello from the backend!',
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

It may be self-evident, but I wanted to make it clear to myself that Promise is a FE concept. On the back end, we just sent a formatted (json is popular) data. On the front end, we use a promise, which here is an optimised version (fetchAPI) to resolve this data by not blocking the other processes. 


### But in summary, Promises are just **wrappers**, we wrap some data we know is coming from an async operation and then use async/await or .then()/.catch() to **unwrap it**.

```sh
const response = new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://...")'
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(new Error(xhr.status == 404))
        }
    }
})

async function fetchData() {
    try {
        const data = await response;
        const parsedData = JSON.parse(data);
        console.log(parsedData.message);
    } catch (error) {
        console.error("Error fetching data:", error);
        dataContainer.textContent = "Failed to get data.";
    }
}

fetchData();

//OR 

response
    .then(data => {
        const parsedData = JSON.parse(data);
        console.log(parsedData.message);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
```

NB. if you use fetch, it comes with improvements, one of which is directly having a .json() method, axios does goes further and directly serves a js object.