### Basic setup
```js
// Step 1: Define action types
const actionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

// Step 2: Create actions
const incrementAction = () => ({
  type: actionTypes.INCREMENT,
});

const decrementAction = () => ({
  type: actionTypes.DECREMENT,
});

// Step 3: Define the reducer with cases corresponding to the actions
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, count: state.count + 1 };
    case actionTypes.DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Step 4: Configure the store with the reducer
import { createStore } from 'redux';

const store = createStore(counterReducer);

// Example usage:
store.dispatch(incrementAction()); // Increments the count
store.dispatch(decrementAction()); // Decrements the count

// To log the current state
console.log(store.getState()); // { count: 0 } initially, then updates based on actions dispatched
```


### Add dynamic payload

```js
// Step 1: Define action types
const actionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

// Step 2: Create actions with payload
const incrementAction = (amount = 1) => ({
  type: actionTypes.INCREMENT,
  payload: amount,
});

const decrementAction = (amount = 1) => ({
  type: actionTypes.DECREMENT,
  payload: amount,
});

// Step 3: Update the reducer to handle the payload
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, count: state.count + action.payload };
    case actionTypes.DECREMENT:
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

// Step 4: Configure the store with the reducer
import { createStore } from 'redux';

const store = createStore(counterReducer);

// Example usage with payload:
store.dispatch(incrementAction(5)); // Increments the count by 5
store.dispatch(decrementAction(3)); // Decrements the count by 3

// To log the current state
console.log(store.getState()); // Logs the updated state based on actions dispatched
```

The payload is passed as a second argument after type and **both are accessible via action argument in the relevant reducer**:
  type: actionTypes.DECREMENT,
  payload: amount,
  =>
  action.type
  action.payload

### Add action creators

```js
// Action Types
const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Synchronous Action Creators
const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: { data },
});

const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error },
});

// Async Action Creator (using Redux Thunk)
const fetchDataAsync = url => {
  return dispatch => {
    dispatch(fetchDataBegin());
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDataSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchDataFailure(error)));
  };
};
```
Action creators are functions and after redux toolkit era there is a helper function that simplifies the process:

- OLD

```js
const INCREMENT = 'counter/increment'

function increment(amount) {
  return {
    type: INCREMENT,
    payload: amount,
  }
}

const action = increment(3)
// { type: 'counter/increment', payload: 3 }
```

- NEW

```js
import { createAction } from '@reduxjs/toolkit'

const increment = createAction('counter/increment')

let action = increment()
// { type: 'counter/increment' }

action = increment(3)
// returns { type: 'counter/increment', payload: 3 }

console.log(`The action type is: ${increment.type}`)
// 'The action type is: counter/increment'
```


## Vital to understand redux (using a state hook analogy):

const [state, setState] = useState({})

Actions are the setStates. Reducers' cases make it possible that we can have specific setStates (here comes the logic to have specific actions).

Reducers are functions that have cases to update state with **payload** based on **type** of action. All reducers are usually combined and applied together so imagine the store as having a number of cases awaiting the specifically corresponding actions.

Action creators are not actions but functions that:
1) can be used to pass dynamic variables to actions (regular actions are objects and thus cannot)
2) can be used to execute some services logic with API clients, DB manipulation etc.
3) can be used to dispatch regular actions (but not necessarily although that would be misleading and defeating the purpose - to use action creator not for managing redux state but say navigation orchestration)
