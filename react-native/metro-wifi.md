### Metro serves the bundle from my mac to all devices on the same wifi

**If your device and your computer are on the same Wi-Fi network, they can communicate with each other using their local IP addresses. This is how the app on your device is able to make requests to the Metro server running on your computer.**

The Metro server is designed to handle multiple connections. When a React Native application starts, it requests the JavaScript bundle from the Metro server. The server then compiles the necessary JavaScript and sends it to the requesting client. This process is independent for each client that connects to the Metro server.

So, you can have your app running on multiple devices and simulators at the same time, all connected to the same Metro server. Each instance of your app will get its own version of the JavaScript bundle. Any changes you make to your JavaScript code will be sent to all connected clients when you save, thanks to React Native's live reloading feature.
