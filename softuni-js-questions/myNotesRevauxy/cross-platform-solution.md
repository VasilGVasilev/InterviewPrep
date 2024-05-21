## How to have a cross-platform front end?

While directly running a pure HTML/JS page within an iOS, Android, and desktop app isn't the most common approach, there are a couple of options to achieve a similar outcome:

### Mircofront end way

WebView: This is the most common approach. All major mobile development frameworks (like React Native for both iOS and Android) and desktop frameworks (like Electron) have components called WebView that essentially embed a web browser instance within your app. You can then load your HTML/JS page into this WebView, allowing it to function mostly as intended. Here are some things to keep in mind.

### Frameworks like React Native, Flutter