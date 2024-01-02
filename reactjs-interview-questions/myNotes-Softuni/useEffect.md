Starting with the fact that useEffect is not recommended even by the React team anymore. It renders before fetch so a better alternative for other reasons too is react-query.

see ./public/useEffect-render-problem 




Purpose: useEffect() helps you handle things that are outside the realm of React such as API calls, asynchronous events, and other **side effects**.

```sh
const Songs = props => {
    const [songs, setSongs] = useState([])    
    fetch(url)
        .then(resp => resp.json())
        .then(data => this.setState()    
        return()
}
```

BUT SIDE EFFECTs:
- On every re-render of <Songs />, a HTTP request will be sent which is unlikely to be wanted.
- The state will be reset by the fetch.
- An infinite loop is executed as setSongs() will execute a re-render which leads to a fetch each time.

SOLUTION FOR SIDE EFFECTs: useEffect() is to be used for side-effects executed in the render cycle.

```sh
const Songs = props => {
    const [songs, setSongs] = useState([])   
    useEffect(() => {
        fetch(url)
        .then(resp => resp.json())
        .then(data => this.setState()
        })   
    return()
}
```

HERE, useEffect() is executed after every render cycle (both the render and every re-render)

To prevent infinite loop side effect, a second argument is called:
```sh
useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => this.setState()
    }, [])
```

The first argument expected by the useEffect Hook, is a callback function where you write the code to 
be executed. 
The second is an array [] called a dependency array. 

- If the array is omitted, the callback function will run every time the code changes. ---> infinite fetch render loop 
- If the array is empty, the callback function will run once. /Initialization empty/ ---> like  componentDidMount()
- If there is a value provided, the callback function will run each time the value changes. ---> like componentDidUpdate()

BUT useEffect is not like a lifecycle method, rather applying a synchronisation mental model:

The question is not "when does this effect run" rather, "with which state does this effect synchronize with":
    useEffect(fn) // all state
    useEffect(fn, []) // no state
    useEffect(fn, [these states])



Full example with useEffect():
```sh
import { useState, useEffect } from "react";

export function useCounter() {
    const [count, setValue] = useState(0);
    const [isEven, setIsEven] = useState(false);

    useEffect(() => {
        if (count % 2 === 0) {
        setIsEven(true);
        } else {
        setIsEven(false);
        }
    }, [count]);

    const handleIncrement = () => {
        setValue(count + 1);
    };
    const handleDecrement = () => {
        setValue(count - 1);
    };

    return [count, isEven, handleIncrement, handleDecrement];
}
```

The callback function inside the useEffect() hook sets 'isEven' to be false or true and it also uses 'count' in
the dependency array to ensure that every time 'count' changes the function component useCounter will run.
What Dan Abramov means by saying that the mental model for useEffect() is synchronisation not lifecycles is:
useEffect() does not actively 'watch' for changes, after rendering finishes, useEffect will check the list of
dependency values against the values from the last render, and will call your effect function if any one of them has changed.
Thus, focus is not on entire application rather on the list of dependencies, lack of such does not alter the initial idea.
