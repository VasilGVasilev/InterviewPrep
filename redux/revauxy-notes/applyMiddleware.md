### Why do we need the applyMiddleware?
It is often used for **injecting dependencies like API clients or other services** into the thunk.

- redux-thunk with extra arguments:

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const InspectionsService = {
  // This object would have methods like createItem and updateItem
};

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ Inspections: InspectionsService }))
);
```

3. **Using the Extra Argument in a Thunk**: When you dispatch `saveInspectionItemAsync`, `redux-thunk` middleware invokes the returned function with `dispatch` and `getState` as the first two arguments, and any extra argument you passed to `thunk.withExtraArgument` as the third. In your case, this is an object with `Inspections` as a key.

4. **Calling the Action Creator**: When your action creator function is called the extra Argument via applyMiddleware doesn't need to be provided because it's automatically injected by the `redux-thunk` middleware due to the setup in the Redux store configuration.

This pattern is useful for making your action creators more testable and decoupling them from the concrete implementations of services they use, like the `Inspections` service in your example.

- alternative to redux-thunk

```js
const actions = {
    actionCreatorOne,
    actionCreatorTwo,
    ...
};

const actionsMiddleware = createAsyncActions({
    Inspections,
    ...
});



export const store = configureStore({
    actions,
    middleware: () => new Tuple(actionsMiddleware)
});

export const createAsyncActions = extraArgument => {
    return ({ dispatch, getState }) =>
        next => action => {
            if (typeof action !== 'function') {
                return next(action);
            }
            const result = action(dispatch, getState, extraArgument);
            if (result && typeof result?.catch === 'function') {
                result.catch(error => dispatch(logAppError(error)));
            }
            return result;
        };
};
// OR
const createAsyncActions = extraArgument => store => next => action => {
  if (typeof action === 'function') {
    // Inject extraArgument into the action creator
    return action(store.dispatch, store.getState, extraArgument);
  }

  return next(action);
};

```