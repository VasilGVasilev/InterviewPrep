### No cascading
In React Native, styles are not cascaded like they are in CSS. This means that child components do not inherit styles from their parent components. Therefore, you cannot nest styles in the same way you would in CSS.

### No focus, active, hover etc.

### Elevation

Shadow properties are not enough since they only work on ios, for android - add elevation:

```js
shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}
```

### Dimensions

It is more appropriate to use Dimensions of each device to ascertain percentage when not using fixed values.

```js
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
```


### Stacking
You can stack StyleSheets and the last will override the prior as in this case the last's existance depends on a Boolean

```js
    style={StyleSheet.flatten([
        styles.formContainer,
        (BooleanValue) &&
            styles.formContainerSkinName
    ])}>
```

### Stylesheet.create not necessary
Although semantically and bugcatchingwise in React Native it is more appropriate, you may put in a regular object in the style tag

```js
    style={
        styles.formContainer
    }>
```

### scrollTo is not like web scroollIntoView

```js
    const handleInputFocus = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };
```