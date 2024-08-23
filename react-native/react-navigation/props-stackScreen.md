## Typical passing of components using the component prop of <Stack.Screen>:

```js

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
## why go for the functional passing of the component:

Using the `{props => <AppMagazine {...props} />}` syntax instead of the traditional way of passing a component into the component prop of `<Stack.Screen>` can be beneficial in several scenarios. Here are the key reasons:

1. **Passing Additional Props**
When you need to pass additional props to the component, the `{props => <AppMagazine {...props} />}` syntax allows you to do so easily. This is not possible with the traditional way of passing the component directly.

```js
<Stack.Screen 
  name="Magazine" 
  component={AppMagazine} 
  // This won't work for passing additional props
/>
```

Using the function syntax:
```js
<Stack.Screen 
  name="Magazine" 
  component={props => <AppMagazine {...props} extraProp="value" />} 
/>
```

2. **Conditional Rendering**
If you need to render different components or modify the component based on certain conditions, the function syntax provides the flexibility to do so.

```js
<Stack.Screen 
  name="Magazine" 
  component={props => {
    if (someCondition) {
      return <AppMagazine {...props} />;
    } else {
      return <AnotherComponent {...props} />;
    }
  }} 
/>
```

3. **Accessing Navigation Props**
When you use the function syntax, you have direct access to the navigation props (`navigation`, `route`, etc.) and can manipulate them or pass them down as needed.

```js
<Stack.Screen 
  name="Magazine" 
  component={props => {
    const { navigation, route } = props;
    // Perform some operations with navigation or route
    return <AppMagazine {...props} />;
  }} 
/>
```

4. **Performance Optimization**
In some cases, you might want to avoid re-rendering the entire component tree. The function syntax allows you to control when and how the component should re-render, potentially optimizing performance.

```js
<Stack.Screen 
  name="Magazine" 
  component={props => {
    // Perform some memoization or optimization logic
    return <AppMagazine {...props} />;
  }} 
/>
```

### Example
Here is an example demonstrating the use of the function syntax to pass additional props and conditionally render components:

```js
function AppMagazine({ extraProp, ...props }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Magazine Screen - {extraProp}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Magazine" 
          component={props => <AppMagazine {...props} extraProp="Special Edition" />} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Summary
Using the `{props => <AppMagazine {...props} />}` syntax provides greater flexibility and control over how components are rendered and how props are passed. It is particularly useful for passing additional props, conditional rendering, accessing navigation props, and optimizing performance.


OLD THOUGHTS

# Understanding that you can pass a child function to the Stack.

Screen component comes from a deeper familiarity with React and React Navigation's flexibility. **While the React Navigation documentation might primarily showcase the component prop method for its simplicity, the child function approach leverages React's inherent capabilities.** Here are a few ways to understand how this pattern works and how to discover such features:

1. Official Documentation and API References
React Navigation's documentation does mention using children in Screen components, although it might not be prominently featured. It's worth thoroughly exploring the documentation, especially sections on screen components and customization options.

2. Understanding React Patterns
React commonly uses the "render prop" pattern, which is what this child function approach essentially is. Recognizing this pattern in other libraries or components can help you apply similar concepts in different contexts.

3. Community Examples and Tutorials
The React Navigation community is active and shares various examples, tutorials, and discussions. Reviewing community resources can reveal alternative patterns and advanced usage that may not be immediately obvious from the official docs.

4. Exploring Source Code and Type Definitions
For those comfortable diving deeper, exploring the source code or TypeScript definitions of React Navigation can reveal the flexibility and options available. The Stack.Screen component's implementation would show that it can accept children.

Example from Documentation
Here’s an example directly inspired by concepts typically found in documentation:

```javascript
<Stack.Screen name="Inicio">
  {props => <AppMagazine {...props} />}
</Stack.Screen>
```
This pattern might be showcased under advanced topics, custom screen rendering, or props passing sections in documentation.

Example Code Breakdown
To illustrate, here’s a breakdown of how the child function pattern works:

```javascript
// Import necessary components
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMagazine from './AppMagazine';
import Magazine from './Magazine';
import Login from './Login';

// Create the stack navigator
const Stack = createStackNavigator();

// Define the Screens component
const Screens = () => {
  // Custom prop to pass down
  const customProp = { foo: 'bar' };

  return (
    <Stack.Navigator>
      {/* Inicio Screen */}
      <Stack.Screen name="Inicio">
        {props => <AppMagazine {...props} customProp={customProp} />}
      </Stack.Screen>
      {/* Magazine Screen */}
      <Stack.Screen name="magazine">
        {props => <Magazine {...props} customProp={customProp} />}
      </Stack.Screen>
      {/* Login Screen */}
      <Stack.Screen name="login">
        {props => <Login {...props} customProp={customProp} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Main App component wrapping the Screens with NavigationContainer
const App = () => (
  <NavigationContainer>
    <Screens />
  </NavigationContainer>
);

export default App;
```
Conclusion
Understanding that you can use a child function within Stack.Screen comes from a mix of documentation reading, familiarity with React patterns, and exploring community resources. The flexibility of React Navigation allows for such patterns, providing powerful ways to customize how screens are rendered and how props are passed. If you want to explore more about this, diving into the official docs, following community discussions, and experimenting with the library will be beneficial.

## useNavifation vs ({navigation})

The primary difference between using navigation via params and using the `useNavigation` hook from `@react-navigation/native` lies in how you access the navigation object and the context in which you use it.

### Using Navigation via Params

When you navigate to a screen, the [`navigation`] object is passed as a prop to the screen component. This is useful when you are working within a screen component that is directly registered in the navigator.

<!-- SCREEN under NAVIGATOR -->

```javascript
import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};

export default HomeScreen;
```

### Using the `useNavigation` Hook

The `useNavigation` hook is useful when you need to access the navigation object outside of a screen component, such as in a nested component or a custom hook. It allows you to access the navigation object without passing it down as a prop.

<!-- COMPONENT NOT under NAVIGATOR -->

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = () => {
    const navigation = useNavigation();

    return (
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        />
    );
};

const HomeScreen = () => {
    return (
        <View>
            <CustomButton />
        </View>
    );
};

export default HomeScreen;
```

### Summary

- **Navigation via Params**:
  - Passed as a prop to screen components.
  - Useful for direct screen components registered in the navigator.

- **`useNavigation` Hook**:
  - Accessed via a hook.
  - Useful for nested components or custom hooks where the navigation prop is not directly available.

Both methods provide access to the same navigation object and methods, but the context in which you use them differs.