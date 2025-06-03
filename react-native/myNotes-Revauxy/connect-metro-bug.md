Whenever I change the hosting wifi, my bundler needs configuration:

1. On your Mac, with Metro running, find your current IP address:

ifconfig | grep "inet " | grep -v 127.0.0.1

return -> inet xxx.xxx.x.x netmask xxxxxxxxxx broadcast xxxxxxx

2. you take the inet and run: 

npx react-native start --host <your-ip-address>

3. on your phone, shake the iphone when app is opened

4. choose bundler config

5. enter the ip address and port number