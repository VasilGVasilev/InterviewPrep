glossary:

**host/composite components**
- Host components are the fundamental ones - View, Text, Image, they interact directly with the native platform.
- Composite components are custom made ones:
```js
const MyButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};
```
