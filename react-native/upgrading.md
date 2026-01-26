[how to upgrade react native apps](https://react-native-community.github.io/upgrade-helper/)
You write the two versions current/wanted and apply the suggested changes

also use 
- npm outdate
to pinpoint the versions you have and the ones you need exactly

after upgrading the package.json
- rm -rf node_modules ios/Pods
- npm install
- cd ios && xcodebuild clean && pod install && cd ..
- rm -rf android/build android/app/build
- cd android
- ./gradlew clean

[actual upload of updated build](https://youtu.be/xBZRT5Z3ab8)
- Product Menu -> Archive
- Archives Window -> Distribute App -> TestFlight & App Store -> Distribute
- App Store Connect -> Distribution - set it up -> TestFlight - manage missing compliance -> Distribution - Add Build