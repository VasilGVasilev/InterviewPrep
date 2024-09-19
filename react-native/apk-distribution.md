## Release APK
### To create a standalone APK for distribution without the need to upload to Google Play Store, you can follow these steps:


1. Generate a keystore file if you don't have one. This is used to sign your app. Open a terminal and run:

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

This will create a file `my-release-key.keystore`. Keep this file safe and remember the alias and passwords you entered.

2. Place the `my-release-key.keystore` file under the `android/app` directory in your project.

3. Edit the `android/gradle.properties` file (or create it if it doesn't exist) and add the following:

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=YOUR_STORE_PASSWORD
MYAPP_UPLOAD_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

Replace `YOUR_STORE_PASSWORD`, and `YOUR_KEY_PASSWORD` with the values you used in step 1.

NB> Original tip said to include my-key-alias, but it does not work, so I removed it and only change the above two.

4. Edit the android/app/build.gradle file in your project and add the signing config inside the android block:

**MIND not to add , after debug to add release**

```groovy
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

5. Now you can generate the release APK. In your terminal, navigate to your project directory and run:

```bash
cd android && ./gradlew assembleRelease
```

This will generate a release APK named `app-release.apk` in the `android/app/build/outputs/apk/release/` directory in your project. This APK is a standalone package that includes everything your app needs to run and can be distributed and installed on any Android device.


## Debug APK
1. Enable Developer Mode and USB Debugging on the Android Device:
    - Open Settings on your Android device.
    - Go to About Phone.
    - Tap on Build Number 7 times to enable Developer Options.
    - Go back to Settings, scroll down to Developer Options.
    - Enable USB Debugging.

2. Connect Your Android Device
    - Connect your Android device to your computer using a USB cable.
```sh
adb devices
```
3. Build and Install the APK
    To install the APK on an Android device using React Native, follow these steps:
```sh
npx react-native run-android
```
This will build and install the app directly onto the connected Android device, similar to how Xcode does for iPhones.


Alternatively, you can manually install the APK if you already have a pre-built APK (app-debug.apk):
Manual APK installation:
```sh
cd android
./gradlew assembleDebug
adb install android/app/build/outputs/debug/app-debug.apk
```
