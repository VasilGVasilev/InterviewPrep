The following example shows how making a shallow copy by simply assining an object to an object will make the changes occuring to the cloned object occur to the original object, too. Instead one has to aim to make deep copies, one way is by utilizing JSON parse and stringify if the object can be serialized, thus, alterations made to the clone do not affect the original objects.

```js
let object = {};
object.name = "Vasil"

let cloneObject = object
cloneObject.name = "Peter"

let properlyClonedObject = JSON.parse(JSON.stringify(object))
properlyClonedObject.name = 'newName'

console.log("object.name", object.name);
console.log("cloneObject.name", cloneObject.name);
console.log("properlyClonedObject.name", properlyClonedObject.name);
```