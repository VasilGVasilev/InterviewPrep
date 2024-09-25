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

## Rendering pipeline:
- render -> create the React Element Trees and its equivalents React Shadow Nodes out of reduced to React Host Componenets React Elements
- commit -> **calculate** the position and size of each React Shadow Node (original js styles within the devices' layout constraints) + **promote** the tree to be next to be mounted
- mount ->  applies the React Shadow Nodes to the host platform as Host Views (<View> -> android.view.ViewGroup && <Text> -> android.widget.TextView )
