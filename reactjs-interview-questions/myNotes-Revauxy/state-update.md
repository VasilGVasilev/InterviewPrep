The state update in React is **ASYNCHRONOUS**, which means that the new state value (selectedImage) will not be immediately available after calling setSelectedImage. Therefore, using selectedImage directly after calling setSelectedImage within the same useEffect will not work as expected because the state update will not have taken effect yet:

```js
const [selectedImage, setSelectedImage] = useState({});

useEffect(() => {

    if (route?.params) {
        setSelectedImage(route.params); //setting state here
        getSomeImages(selectedImage); //does not mean it will be ready to use the very next code line
    }
}, [route]);
```

SOLUTION: easiest is to have two useEffects:

```js
const [selectedImage, setSelectedImage] = useState({});

useEffect(() => {

    if (route?.params) {
        setSelectedImage(route.params); //setting state here
        getSomeImages(selectedImage); //does not mean it will be ready to use the very next code line
    }

}, [route]);

useEffect(() => {

    getSomeImages(selectedImage); 

}, [selectedImage]);
```

NB: you might be tempted to have both state values in the same dependency array of the same useEffect, but there might be problems with circular dependencies, inconsistent behaviour, performance concerns.