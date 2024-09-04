In React Native, **platform-specific files take priority over the generic `.js` file.** When you have files named `file.js`, `file.android.js`, and `file.ios.js`, React Native will automatically use the platform-specific file based on the platform the app is running on.

### Priority Order:
1. **`file.android.js`**: Used when the app is running on an Android device.
2. **`file.ios.js`**: Used when the app is running on an iOS device.
3. **`file.js`**: Used as a fallback if no platform-specific file is found.

### Example:
If you have the following files:
- `file.js`
- `file.android.js`
- `file.ios.js`

When running the app on an Android device, React Native will use `file.android.js`. When running on an iOS device, it will use `file.ios.js`. If neither `file.android.js` nor `file.ios.js` exists, it will fall back to `file.js`.

### Usage:
This allows you to write platform-specific code when necessary while keeping shared code in the generic file.

### Example Directory Structure:
```
components/
  ├── MyComponent.js
  ├── MyComponent.android.js
  ├── MyComponent.ios.js
```

### Code Example:
```javascript
// MyComponent.js
export default function MyComponent() {
    return (
        <View>
            <Text>This is a shared component</Text>
        </View>
    );
}

// MyComponent.android.js
export default function MyComponent() {
    return (
        <View>
            <Text>This is an Android-specific component</Text>
        </View>
    );
}

// MyComponent.ios.js
export default function MyComponent() {
    return (
        <View>
            <Text>This is an iOS-specific component</Text>
        </View>
    );
}
```

In this example, the appropriate component will be used based on the platform the app is running on.