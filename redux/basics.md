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


### Relationship Between Action Creators and Reducers
Action Creators: Define the actions that can be dispatched to the store. They do not directly update the state.
Reducers: Define how the state should be updated **in response** to actions. They are responsible for handling the actions dispatched to the store.


# Whole process:
Define Reducers: You define individual reducers that specify how different parts of the state should be updated in response to actions.

Combine Reducers: You use combineReducers to combine these individual reducers into a single root reducer. This root reducer is then used to create the Redux store.

Create Store: You create the Redux store using the root reducer. The store holds the entire state of your application and provides methods to dispatch actions and subscribe to state changes. Also, can select states via useSelector.

Dispatch Actions: You dispatch actions to the store using the dispatch function. Actions are plain JavaScript objects that describe an event or change that should happen in the state.

Reducers Handle Actions: The store forwards dispatched actions to the reducers. Each reducer checks the action type and updates the state accordingly.