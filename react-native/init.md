### Do I need to run npm start and npm run android every time I work on the app?

If you've made changes to the React Native JavaScript code, you don't need to rebuild the entire app. The Metro Bundler, which should be running during your development process, will take care of bundling your JavaScript code and reflecting those changes in your app. 

When you save your changes, the Metro Bundler will detect the changes, bundle the updated JavaScript code, and send it to your app. The app will then reload the JavaScript code, which will reflect your changes.

However, if you've made changes to the native code (the Java or Kotlin code in the `android` directory, or the Objective-C or Swift code in the `ios` directory), you will need to rebuild your app. This is because the native code is compiled into a binary format that can't be updated on the fly like JavaScript code. 
