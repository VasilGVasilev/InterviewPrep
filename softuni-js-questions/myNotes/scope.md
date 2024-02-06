Javascript had traditionally global and function scope.

- Function scope:
```sh
function myFunc(){
    var a = 'a';
    let b = 'b';
    const c = 'c';
}
console.log(a, b, c)
# LOGS ERROR
```

- Block Scope:
The addition of block scope incorporated the above logic for any other block aside from function
```sh
if (true) {
let x = 10; // x is only accessible within this block
console.log(x); // 10
}

// console.log(x); // This would result in an error, as x is not defined in this scope AFTER ES6 INTRODUCTION OF BLOCK SCOPE
```