I've come across this example in Redux docs:

```sh
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}
```

which executes via:
```sh
onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
```

I was wondering why we did not pass on amount as an argument to the inner function.
The direct answer is closure, but also due to currying.
Currying nests functions and in our example we have

```sh
(dispatch) => {
setTimeout(() => {
    dispatch(incrementByAmount(amount))
}, 1000)
```

returned (nested) within

```sh
export const incrementAsync = (amount) => 
```

and when we come to execute via    dispatch(incrementAsync(Number(incrementAmount) || 0))
we call incrementAsync with some number which returns the function returned by incrementAsync, namely:

```sh
(dispatch) => {
setTimeout(() => {
    dispatch(incrementByAmount(amount))
}, 1000)
```

which as a function needs dispatch as an argument (coming from the Redux store) to execute as we can see  dispatch(incrementByAmount(amount))

So to understand currying, mind that it is basically a call to the outer function that triggers the return of the inner while this call of the outer function provides an argument (this argument is in closure and the inner function can rely on it), then with the second call of the already 'closured' inner function we actually trigger an execution of that inner function along any closure variables it uses provided by the outer function call, see:

```sh
function add(a, b) {
  return a + b;
}

function curryAdd(a) {
  return function(b) {
    return add(a, b);
  };
}

const addFive = curryAdd(5);
console.log(addFive(10)); // Output: 15
```

addFive creates a closure with 5 and becomes a function expression equal to the returned inner function with argument (b), then when we call addFive with its own argument, it is in fact calling that inner function with argument (b) which is now 10 and due to the closure created intiially, argument a is substituted with 5 and innermost function add(a, b) is executed as add(5, 10)

**Thus, currying is like a return of inner function from aouter functions with the goal of having the abiloity to store at least one argument in closure. It is a sort of combining consecutively functions with closures carrying for the argument of the combined functions.**