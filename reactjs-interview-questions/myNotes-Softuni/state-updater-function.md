
```sh
const clickHandler = (e) => {
    setClicks(oldClicks => oldClicks + 1);
}
```

why not:

```sh
const clickHandler = (e) => {
    setClicks(clicks + 1);
}
```    

Because -> race conditions -> if eventHandler function clickHandler is so fast click state is still not updated

Suppose the age is 42. This handler calls setAge(age + 1) three times:

```sh
function handleClick() {
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1)
}
```

However, after one click, age will only be 43 rather than 45! 
This is because CALLING THE SET FUNCTION DOES NOT UPDATE the age STATE variable IN THE ALREADY RUNNING CODE.
To solve this problem, you may pass an UPDATER FUNCTION into setAge:

```sh
function handleClick() {
    setAge(a => a + 1); // setAge(42 => 43)
    setAge(a => a + 1); // setAge(43 => 44)
    setAge(a => a + 1); // setAge(44 => 45)
}
```

React puts your updater functions in a queue. 
Then, during the next render, it will call them in the same order:

1. a => a + 1 will receive 42 as the pending state and return 43 as the next state.
2. a => a + 1 will receive 43 as the pending state and return 44 as the next state.
3. a => a + 1 will receive 44 as the pending state and return 45 as the next state.