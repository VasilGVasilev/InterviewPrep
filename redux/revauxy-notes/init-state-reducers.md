# When the Redux store is initialized, it calls each reducer with an undefined state and an action of type @@redux/INIT.

Having a reducer with an initial state, such as initStaticNom, means that **the initial value of the staticNom state is set when the Redux store is created, even if no actions have been dispatched yet.** This is a fundamental aspect of how Redux works. **When the Redux store is initialized, it calls each reducer with an undefined state and an action of type @@redux/INIT.** This ensures that each reducer returns its initial state. Here is the relevant part of your reducer:

```js
const staticNom = (state = initStaticNom, action) => {
    switch (action.type) {
        case 'SET_STATIC_NOM':
            const rz = { ...state, ...action.data };
            return rz;
        default:
            return state;
    }
}
```
In this code, state = initStaticNom sets the default value of the state to initStaticNom if the state is undefined. When the store is created, Redux will call this reducer with undefined as the state, causing it to return initStaticNom as the initial state.

Therefore, all reducers execute with their initial values from the very start of the app, ensuring that the Redux state tree is fully populated with the initial states defined in each reducer. This allows the application to have a predictable state structure right from the beginning, even before any user interaction or actions are dispatched.