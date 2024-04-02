We need to have access to state and dispatch from within the action creators. 

The dispatch and getState functions are provided by the Redux store. When you apply middleware to the Redux store, Redux automatically provides these functions to each middleware.

Here's an example of how you might create a Redux store and apply the createAsyncActions middleware:

```sh
import { createStore, applyMiddleware } from 'redux';
import { createAsyncActions } from './middleware';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(createAsyncActions(extraArgument))
);

export default store;
```

When you call applyMiddleware(createAsyncActions(extraArgument)), Redux calls createAsyncActions(extraArgument) with an object that contains dispatch and getState. This is how dispatch and getState are provided to your middleware.

So, this is how dispatch and getState can be used as params in the thunk.

```sh
export const setAppSettingsAsync =
    (appsettings, navRouteName, navOpts) => (dispatch, getState, { DataBase }) => {
        return DataBase.setAppSettings(appsettings)
            .then(() => dispatch(setAppSettings(appsettings)))
            .then(() => dispatch(navigateToRoute(navRouteName, navOpts)));
    };
```