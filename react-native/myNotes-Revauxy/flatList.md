This is more of a tip how to approach the docs but it occurred to me that **FlatList** has been used with a prop **contentContainerStyle** which is not part of the official docs, yet, ai research easily reveals **FlatList** internally uses **ScrollView** which does have **contentContainerStyle** as a prop.

### Also, why do we pass item in the renderItem prop?

The FlatList component wraps each item in an object with the key item, and the renderItem function needs to destructure this object to access the actual data. This is a standard pattern in React Native for rendering lists. Thus, we have {item: {title, id}} instead of {{title, id}}, directly. **we need the item as an object**

```js
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item: {title, id}}) => <Item title={title} />}
        keyExtractor={{id} => id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```