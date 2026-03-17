```js
// actions.js
export const SET_USER = 'SET_USER';
export function setUser(payload) {
  return { type: SET_USER, payload };
}



// reducer.js
const initialUserState = { userName: '', email: '' };
export function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}



// store.js
import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducer';

const rootReducer = combineReducers({ user: userReducer });
export const store = createStore(rootReducer);



// app.js (usage)
import { store } from './store';
import { setUser } from './actions';

// User triggers an event (e.g., form submit) -> dispatch
store.dispatch(setUser({ userName: 'JohnDoe', email: 'john.doe@example.com' }));

```
Dispatch to actual state update

dispatch with setUser compares the suitable type to the reducers' possible cases. setUser returns a plain object and this object has action type and action payload, the type that matches the set in the relevant reducer triggers an update of the state with the relevant payload.