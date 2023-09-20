// // Object create

// let a = new Object()
// let b = Object.create(null);

// // Constructor function
// function Person (name) {
//     this.name = name;
// }
// let john = new Person('john')
// console.log(john);

// // Class syntax
// class Dog {
//     constructor (name) {
//         this.name = name;
//     }
// }

// let bauwi = new Dog('bauwi')
// console.log(bauwi);


// for (let i = 0; i < 4; i++) {
//     console.log('for loop iteration', i)
//     setTimeout(() => {
//       console.log('block scope return of callback value', i); // Each callback captures its own block-scoped `i`
//     });
//   }

function decorator(fn){
  return function(){
      console.log('Hello, world!')
      const result = fn();
      return result;
  }
}


const myName =  decorator(() =>console.log('Vasil'))

myName()