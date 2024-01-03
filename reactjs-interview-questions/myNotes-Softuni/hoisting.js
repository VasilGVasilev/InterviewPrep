message = 'The variable Has been hoisted'; //initialisation
console.log(message); //execution
var message; //declarations


// this will output 'The variable Has been hoisted' without error, although intialization is not hoisted, rather only declaration
// var is hoisted as it makes variables global

message = 'The variable Has been hoisted'; //initialisation
console.log(message); //execution
let message; //declaration

// this will output ReferenceError: Cannot access 'message' before initialization, the same will happen with const.