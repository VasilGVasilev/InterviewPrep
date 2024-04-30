Unlike jest and most other testing frameworks, Maestro show each subtest being executed (each expect/assert in a it()).

Installing Maestro globally is easy, generating the .yaml too.

But how do we attach it to our app?

```yaml
appId: com.example.app
---
```

You can find the appId in the following locations:

- Android: Check the applicationId in the android/app/build.gradle file.
- iOS: Open the ios/MyApp.xcworkspace in Xcode, select your target, and look at the Bundle Identifier under the General tab.

Replace com.example.app with your actual appId in the Maestro configuration.


Using identifiers?

Even though the attribute is testID in your React Native code, you use id in your Maestro workflow. Maestro takes care of translating id to testID when it runs the test on your React Native app.

```js
<Button testID="myButton" title="Press Me" onPress={() => console.log('Pressed')} />
```

```yaml
- tapOn:
    id: "myButton"
```


