# React Native Font Integration Guide

Here's a recap of the instructions for adding custom fonts to your React Native project for both iOS and Android:

## Step 1: Add Font Files to Your Project

1. Place font files (e.g., RobotoCondensed-Bold.ttf) in your assets directory:
   ```
   src/assets/fonts/
   ```

2. Configure react-native.config.js (at the root of your project):
   ```javascript
   module.exports = {
     assets: ['./src/assets/fonts']
   };
   ```

## Step 2: Link Fonts with React Native CLI

Run the command to link fonts to native projects:
```bash
npx react-native-asset
```

This copies your fonts to:
- iOS: `ios/[YourApp]/Fonts/`
- Android: fonts

## Step 3: iOS-Specific Setup

1. Verify fonts are listed in `ios/[YourApp]/Info.plist`:
   ```xml
   <key>UIAppFonts</key>
   <array>
     <string>RobotoCondensed-Regular.ttf</string>
     <string>RobotoCondensed-Bold.ttf</string>
     <!-- Other font files -->
   </array>
   ```

2. Rebuild iOS app to apply changes:
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

## Step 4: Android-Specific Setup

1. Verify fonts are in the Android assets folder:
   ```bash
   ls -la android/app/src/main/assets/fonts/
   ```

### NB 2. and 3. are not necessary due to modern RN (0.60+) auto-linking, android platform evolution, etc.

2. For better compatibility, create a fonts.xml file:
   ```bash
   mkdir -p android/app/src/main/res/font
   ```

   Create `android/app/src/main/res/font/fonts.xml`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <font-family xmlns:app="http://schemas.android.com/apk/res-auto">
     <font app:fontStyle="normal" app:fontWeight="400" app:font="@font/robotocondensed_regular" />
     <font app:fontStyle="normal" app:fontWeight="700" app:font="@font/robotocondensed_bold" />
     <!-- Add other weights as needed -->
   </font-family>
   ```

3. Ensure Android build.gradle is configured:
   ```gradle
   // In android/app/build.gradle
   android {
     // ...other configurations...
     sourceSets {
       main {
         assets.srcDirs = ['src/main/assets', '../../assets']
       }
     }
   }
   ```

### NB 2. and 3. are not necessary due to modern RN (0.60+) auto-linking, android platform evolution, etc.


4. Clean and rebuild Android app:
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

## Step 5: Using Fonts in Your App

1. **Basic Usage:**
   ```javascript
   <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>Bold Text</Text>
   ```

2. **Platform-Specific Names:**
   ```javascript
   import { Platform } from 'react-native';

   const styles = StyleSheet.create({
     boldText: {
       fontFamily: Platform.OS === 'ios' 
         ? 'RobotoCondensed-Bold'
         : 'robotocondensed_bold',  // Android might use underscores
       fontSize: 16,
     }
   });
   ```

3. **Creating a Font Utility:**
   ```javascript
   // utils/Fonts.js
   import { Platform } from 'react-native';

   export const Fonts = {
     REGULAR: Platform.OS === 'ios' 
       ? 'RobotoCondensed-Regular'
       : 'robotocondensed_regular',
     BOLD: Platform.OS === 'ios' 
       ? 'RobotoCondensed-Bold'
       : 'robotocondensed_bold',
     // Add other variants
   };
   ```

4. **Update your default styles:**
   ```javascript
   // styles.js
   import { Fonts } from '../utils/Fonts';

   styles.defaultFont = { fontFamily: Fonts.REGULAR }
   styles.boldFont = { fontFamily: Fonts.BOLD }
   ```

## Troubleshooting Tips

1. **Font name mismatch:** Use the exact file name without extension
   - iOS is usually exact (RobotoCondensed-Bold)
   - Android might use lowercase and underscores (robotocondensed_bold)

2. **Font not appearing:** Create a test component to verify fonts

3. **Clear cache if needed:**
   ```bash
   npx react-native start --reset-cache
   ```

4. **iOS rebuild:**
   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

5. **Android rebuild:**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

6. **Check PostScript name:** Sometimes the internal font name differs from the file name - you can check by opening the font file with a font viewer

By following these steps, you should be able to successfully integrate and use custom fonts like Roboto Condensed in your React Native application across both iOS and Android platforms.

Similar code found with 1 license type