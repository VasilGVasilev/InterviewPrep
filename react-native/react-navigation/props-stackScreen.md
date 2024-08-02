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