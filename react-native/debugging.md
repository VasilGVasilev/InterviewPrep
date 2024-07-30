[follow the guide](https://reactnative.dev/docs/debugging#opening-the-debugger)

Flipper is depreciated, use Hermes

we prefer to use npx react-devtools as an alternative to installing it as a dev dependency for every project

### Redux?

Redux is traditionally debugged in the browser via an extension. Since react-native 0.73 discontinued remote debugging, options like React Native Debugger became obsolete for Redux. 

My solution is Reactotron.

Mind to not use homebrew for a cask since they have no m1 ones, thus, download from official repo.

follow the instructions for:
[react native](https://docs.infinite.red/reactotron/quick-start/react-native/)
[redux](https://docs.infinite.red/reactotron/plugins/redux/)
