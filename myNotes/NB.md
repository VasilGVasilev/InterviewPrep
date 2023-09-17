- !! returns a boolean based on truthy or falsy value
```sh
let truthy = 'a'
console.log(!!truthy)
```

- difference between undefined and null is that undefined is not an assignment value, while null is an assignment value

- window is the root level element in any web page, document is its first child

- test if object is empty
```sh
Object.entries(obj).lenght === 0 && obj.constructor === Object
```



JS is a dynamic language because we do not explicitly set the type of the value when we store our variable

```sh
let a = 5 //a is a number
a = 'hello' //a is a string
a = true //a is a boolean
```



virtual DOM

What if we want to manipulate the virtual DOM or temper with the global browser object - window?
For virtual DOM manipulation, React leaves us a leeway via useRef:
```sh
<input ref={myRef} />;
```

For window object tempering -> It is generally discouraged since avoiding the official prescribed way may result in an unwanted behaviour. A framework is after all is like a metaapp, it build another app to communicate with the browser in this case and skipping the tools provided and bypassing that extra layer with traditional approach is obviously prone to mistakes.



Set
getting unique values
```sh
console.log([...new Set([1, 2, 4, 4, 3])]);
```




flatten a multi-dimensional array -> recursion

```sh

const multiDimensionalArr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];

function flattenArr (arr) {
    let flattened = [].concat(...arr);
    return flattened.some(item => Array.isArray(item)) ? flattenArr(arr) : flattened;
}

flattenArr(multiDimensionalArr)
```




multi-conditional checking

```sh
// Verbose approach
if (input === 'first' || input === 1 || input === 'second' || input === 2) {
  someFunction();
}
// Shortcut
if (['first', 1, 'second', 2].indexOf(input) !== -1) {
  someFunction();
}
```