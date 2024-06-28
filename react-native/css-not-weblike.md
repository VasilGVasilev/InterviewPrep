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