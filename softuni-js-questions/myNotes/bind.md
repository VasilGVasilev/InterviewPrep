The bind() method of Function instances **creates a new function** that, when called, calls this function with its this keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.


```sh
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

console.log(module.getX());
// Expected output: 42

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42

```

bind creates a new function so you need to pass on an argument for this new function this