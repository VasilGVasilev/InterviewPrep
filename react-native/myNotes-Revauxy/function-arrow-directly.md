If I have no params, I can pass the function directly.

```js
const handlePress = () => {
  console.log('Button pressed');
};

return (
  <Pressable onPress={handlePress}>
    <Text>Press Me</Text>
  </Pressable>
);
```
    *no need to put it in arrow function as it will cause the creation of unnecessary function, even though it will not affect performance at all.

If I have params, I should pass the function with an arrow.

```js
const handlePress = (buttonID) => {
  console.log(`Button ${buttonID} pressed`);
};

return (
  <Pressable onPress={()=>handlePress(1)}>
    <Text>Press Me</Text>
  </Pressable>
);
```