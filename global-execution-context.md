A temporal dead zone (TDZ) is the block where a variable is inaccessible until the moment the computer initializes it with a value:

console.log(a) // ReferenceError
let a = 'hello'

BUT

m() // 5
function m () {
    return 5;
}

This is because of the way GEC works -> memory allocation and code execution phase

memory: 
a: ReferenceError
m: {}

code: 

console.log(a) //which is ReferenceError thus the same output
m() //which is as a function stored during memory allocaiton phase fully thus returns a valid value of 5 as an output