The **??** operator in JavaScript is the nullish coalescing operator. It is used to provide a default value in case the left-hand operand is null or undefined.

```js
// Example 1: Assigning a default value
let name = userName ?? "John Doe";

if (userName === null || userName === undefined) {
  name = "John Doe";
} else {
  name = userName;
}

console.log(name); // Output: John Doe (if userName is null or undefined)
```