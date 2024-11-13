# What is Redux?

- **Store**: Holds the entire state of the application.
- **Actions**: Describe events or changes that should happen in the state.
- **Reducers**: Pure functions that specify how the state should change in response to actions.
- **Dispatching**: Actions: Actions are dispatched to the store, which sends them to the reducers.
- **State Update**: The store updates the state with the new state returned by the reducers.

The store is where the state is stored, the reducers update this state via the actions and the specfic types and data they come with.

### Action: 

```js
const setUserAction = {
    type: 'SET_USER_DATA',
    data: {
        userName: 'JohnDoe',
        email: 'john.doe@example.com'
    }
};
dispatch(setUserAction);
```

### Reducer:

```js
const isThereUser = (state = initialUserState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, ...action.data };
        default:
            return state;
    }
};
```

### Store:

```js
const rootReducer = combineReducers({
    isThereUser,
    // other reducers
});

const store = createStore(rootReducer);
```

The whole store has states, which are set via each reducer's initState (see prop state = initState).