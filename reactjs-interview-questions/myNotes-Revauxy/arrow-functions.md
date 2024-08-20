# Fixed values use ()=>{sumOf(1,2)} 
# Dynamic values use (e)=>{someEvent(e)} 

### Summarizing the Two Approaches:

1. **Fixed Value Arguments** (`() => { sumOf(1, 2) }`):
   - **Use Case**: When you have fixed, predefined values that you want to pass to a function.
   - **How it Works**: The arrow function doesn't need any parameters because the values you want to use are already known and do not depend on any event or dynamic input.
   - **Example**:
     ```javascript
     onPress={() => { sumOf(1, 2) }}
     ```
     Here, `sumOf(1, 2)` will always be called with `1` and `2`, regardless of any external input.

2. **Dynamic Values (e.g., Event Data)** (`e => { someEvent(e) }`):
   - **Use Case**: When you need to handle data that is passed dynamically, such as event data or other changing inputs.
   - **How it Works**: The arrow function captures the dynamic input (like an event object `e`), which is then passed to the function. This is crucial when dealing with event handlers in React Native (or any JavaScript framework).
   - **Example**:
     ```javascript
     onPress={e => { handleEvent(e) }}
     ```
     Here, `handleEvent` will be called with the event data `e` that is provided by the event listener (e.g., a press event).

### General Rule of Thumb:

- **Use `()` with no parameters** when the arguments you pass to a function are static or predefined at the time of writing the code.
- **Use `(e)` (or another placeholder parameter)** when the arguments depend on dynamic input, such as user interactions or other events that occur during runtime.

### Practical Examples:

1. **Fixed Argument Example**:
   ```javascript
   <Button onPress={() => { sumOf(1, 2) }} />
   ```
   - The `sumOf` function always gets `1` and `2` as arguments, regardless of how or when the button is pressed.

2. **Dynamic Argument Example**:
   ```javascript
   <TextInput onChangeText={text => { handleTextChange(text) }} />
   ```
   - The `handleTextChange` function receives the text input by the user, which varies depending on what the user types.

### Conclusion:

- **Fixed values**: Use `() => { functionName(args) }`.
- **Dynamic values**: Use `(e) => { functionName(e) }` (or whatever the dynamic input is).

This way, you handle static and dynamic inputs appropriately, ensuring your code behaves as expected in different scenarios.