You have the object:

```js
const dimensions = {
  height: 800, // Example height in pixels
  width: 400,  // Example width in pixels
  scale: 2,    // Example scale factor
};
```

and you want to use it:

```js
const extractedHeight = dimensions.height // variable logs 800
```

so extractedHeight gets the object dimensions' key value height assigned to it

but what if we want to assign all of the keys to a new varibale each

instead of:
```js
const extractedHeight = dimensions.height // variable logs 800
const extractedWidth = dimensions.width // variable logs 400
const extractedScale = dimensions.scale // variable logs 2
```

do: 
```js
const { heigth: extractedHeight, width: extractedWidth, scale: extractedScale } = dimensions
```

thus, extractedVariables capture so to speak the values of the keys via the above syntax const {key:value} = obj