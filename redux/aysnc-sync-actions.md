In Redux, an "action creator" is anything that returns something we can dispatch. Typically, a simple action creator returns a plain action object. However, in the case of thunks, they return functions that themselves can dispatch ac

That’s why both synchronous and asynchronous versions are often called “thunk action creators.”

### 1. **Action Creator** NO PARAMS
An **action creator** is a function that **returns a plain action object**. This object usually has at least a `type` field, and sometimes it has a `payload` with additional data.

Example:
```javascript
// Action Creator
const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

// Usage
const action = setUser({ name: 'Alice' });
console.log(action);
// Output: { type: 'SET_USER', payload: { name: 'Alice' } }
```
- `setUser` is a **plain action creator**. It simply returns an action object when called.
- It does **not contain any async logic** and **does not interact with `dispatch` or `getState`** directly.

### 2. **Thunk** FOR SYNC AND PARAMS
A **thunk** is a function that **delays the execution of some logic**. In Redux, a thunk is a function that doesn't directly return an action object but instead returns a function. This returned function receives `dispatch` and `getState` as arguments, allowing it to dispatch actions conditionally or asynchronously.

Example:
```javascript
// Thunk
const logUserIn = (userId) => (dispatch, getState) => {
  // This function (the "thunk") can now access dispatch and getState
  const userState = getState().user;

  // Conditionally dispatch an action
  if (!userState.loggedIn) {
    dispatch({ type: 'LOG_IN_USER', payload: userId });
  }
};

// Usage in a Redux store with thunk middleware
store.dispatch(logUserIn(123));
```

- `logUserIn` is a **thunk**. Instead of returning an action, it returns a function that accepts `dispatch` and `getState`.
- It does **not contain any async logic** but it **does interact with `dispatch` or `getState`** directly.

### 3. **Thunk Action Creator** FOR ASYNC AND PARAMS
A **thunk action creator** is a function that returns a thunk (which is a function itself). This is often used for async operations. When the thunk action creator is called, it returns a thunk function, which contains async logic and can dispatch actions for various states (e.g., `loading`, `success`, `error`).

Example with Async Logic:
```javascript
// Thunk Action Creator
const fetchUserData = (userId) => {
  // This function is the "thunk action creator"
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_USER_PENDING' });

    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
    }
  };
};

// Usage in a Redux store with thunk middleware
store.dispatch(fetchUserData(123));
```

- **`fetchUserData` is the thunk action creator**. When you call `fetchUserData(123)`, it returns a thunk function.
- The returned **thunk function** (an async function) contains the async logic, with calls to `dispatch` for each state (`pending`, `success`, `error`).
- **Async Process**:
  - `dispatch({ type: 'FETCH_USER_PENDING' });` triggers the "loading" state.
  - `dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });` triggers the "success" state after fetching data.
  - If an error occurs, `dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });` triggers the "error" state.

### Summary
- **Action Creator**: Returns a plain action object.
- **Thunk**: Returns a function that can access `dispatch` and `getState` and usually contains conditional or synchronous logic.
- **Thunk Action Creator**: Returns a thunk function that often contains async logic and can dispatch multiple actions as needed. 

NB> Using Redux Toolkit’s `createAsyncThunk` simplifies creating thunk action creators, so you don’t need to write the boilerplate manually, this is if you care to have separate actions for each promise's state.

NB> semantic behind -> thunk action creator - because in Redux anything that can be dispatched is an action creator, so the thunk is dispatchable


# OLD LOGIC 
### thunks and thunk action creators are not the same

The modern way is createAsyncThunk() and use configureStore from the toolkit, which has an automatic thunk middleware. Meaning we have async actions, thus, use the createAsyncThunk() to not go against the logic of Redux. 

Redux expects actions to be plain objects, and reducers to be pure functions. Asynchronous operations are inherently impure, because they involve side effects (like mutating variables outside their scope, making network requests, etc.). By separating synchronous and asynchronous actions, we can keep the reducers pure and handle the side effects elsewhere. (The old way was making a thunk functions, functions that return functions instead of applying creatAsyncThunk() and then making a manual thunk middleware that differntiates object from functions or manually applying a thunk middleware from a library)

*What if we do not differentiate a sync from an async action:*

**Redux actions are dispatched synchronously by default, which means they immediately update the state. However, many real-world applications involve asynchronous operations, such as fetching data from an API, reading from a database, or performing computations that take a significant amount of time. That is why we need thunks, functions that return functions so that we can apply async logic to Redux actions, too.**

Thus, the strcuture -> 

```sh
const someActionAsync = () => (dispatch, getState) => {
  return Promise.resolve()
    .then(()=>dispatch(someOtherActionAsync()))
    .then(()=>dispatch(someThirdActionAsync()))
    .catch(...)
}
```

OR

```sh
const someActionAsync = () => async (dispatch, getState) => {
  try {

    await dispatch(someOtherActionAsync());
    await dispatch(someThirdActionAsync());
    dispatch(someActionNotAsync());
  } catch (error) {
    ...
  }
}
```


If you try to handle an asynchronous operation in a synchronous action, you'll run into issues because of the way JavaScript handles asynchronous operations.

Let's consider an example where you're trying to fetch data from an API. If you try to dispatch a synchronous action with the result of the fetch operation, like this:

```javascript
function fetchUser() {
  const user = fetch('/api/user'); // fetch returns a Promise
  return {
    type: 'FETCH_USER',
    payload: user
  };
}
```

This won't work as expected. The `fetch` function returns a Promise, which is an object representing a future value. When you dispatch the action, `user` won't be the data from the API, it'll be a Promise object. Your reducer will receive this Promise, but it won't know what to do with it. Reducers are supposed to be pure functions, and they can't handle Promises or other asynchronous operations.

Even if you try to use `async/await` or `.then()` to wait for the Promise to resolve, it still won't work, because the action will be dispatched immediately, before the Promise has a chance to resolve and since actions are supposed to be plain objects not promises, it will crash.

```javascript
async function fetchUser() {
  const user = await fetch('/api/user'); // This won't work!
  return {
    type: 'FETCH_USER',
    payload: user
  };
}
```

The correct way to handle this is to use asynchronous actions, often represented as thunks or sagas in Redux. These allow you to dispatch an action to start the asynchronous operation, then dispatch another action when the operation completes, with the result or an error. This way, all actions that reach the reducers are plain objects, and all asynchronous operations are handled outside the reducers.

In the same sense, the code connect the components with redux via .connect() while the modern way is dispatch and selector hooks. To get the full picture
- you either have a hooks distribution or you need to make thunks yourself, manage them via a custom thunk and then use .connect() in the actual component to attach them to the store, not mentioning you have to import them, but this import is for the mapDispatchToProps and connect().

### Thunks

So what are thunks? (in general programming - functions with logic that can be called later)

In Redux, thunks is a pattern of writing functions with logic inside that can interact with a Redux store's **dispatch and getState** methods.

Due to their nature of being higher order functions redux thunks are perfect for handling async operations (but can do sync one too although it defeats their purpose of delayed effect, you can use regular action creators):

```js
// SYNC ACTION CREATOR 
export const setUserData = userData => ({
    type: 'SET_USER_DATA',
    payload: userData
});
```

```js
// ASYNC ACTION CREATOR (THUNK)
export const fetchUserData = userId => {
    return (dispatch) => {
        fetch(`/api/user/${userId}`)
            .then(response => response.json())
            .then(data => dispatch(setUserData(data)));
    };
};
```

### why use action creators? - able to pass in arguments
### why use async action creators ? - able to handle async operations
