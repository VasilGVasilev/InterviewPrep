```sh
function outerFunc(a){
    return function innerFunc(b){
        console.log(a);
        console.log(b);
    }
}


const welcome = outerFunc('hello')
welcome('world')
```

THis is also currying but it is closure, too. Closure, because when we declare the function expression 'welcome', we execute outerFunc and return it, we not only save the innerFunc in 'welcome' but with the argument that we have passed to outerFunc('hello'), namely, closure is a function (in this case innerFunc) bundled with its outer lexical enviroment (in this case a='hello').

This is store in HEAP memory:
```sh
const welcome = function innerFunc(b){
        console.log(a='hello');
        console.log(b);
    }
```


A non-currying example is:

```sh
const createCounter = () => {
 let count = 0;
 return () => {
    count += 1;
    return count;
 };
};

const counter = createCounter();
console.log(counter()); // Outputs: 1
console.log(counter()); // Outputs: 2
```

the createCounter creates a closure -> the function after return and its lexical enviroment count variable. This time, it there are no argumnet passed, but count being in heap memory retains value and each call of createCounter increases it.