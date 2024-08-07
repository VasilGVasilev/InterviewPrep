# Route prop reference

Each screen component in your app is provided with the route prop automatically. The prop contains various information regarding current route (place in navigation hierarchy component lives).

**route**
- key - Unique key of the screen. Created automatically or added while navigating to this screen.
- name - Name of the screen. Defined in navigator component hierarchy.
- path - An optional string containing the path that opened the screen, exists when the screen was opened via a deep link.
- params - An optional object containing params which is defined while navigating e.g. navigate('Twitter', { user: 'Dan Abramov' }).

```js
function ProfileScreen({ route }) {
  return (
    <View>
      <Text>This is the profile screen of the app</Text>
      <Text>{route.name}</Text>
    </View>
  );
}
```

**params**

In React Navigation, the route object is automatically passed to the screen component by the navigator. The route object contains information about the current route, including any [parameters](https://reactnavigation.org/docs/navigation-prop/#navigate) that were passed to the route when navigating to it.

```js
export default function CAMERA({ route }) {
}
```

**If {route} is accessible, where do we pass it in as an arg?**

Look for the name:

```js
<Stack.Screen
    name="camera"
    component={CAMERA}
    options={{ header: () => null }}
/>
```
and where it is used with navigation.navigate('camera', XXX...):

```js
navigation && navigation.navigate('camera', {
    label,
    desc
});
```