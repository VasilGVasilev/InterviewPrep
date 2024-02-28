This was the pre redux toolkit way:
1. actions are separete and the file consists of:
- a variable to by passed into reducer's switch
- the actual action to dispatch and its execution triggers one of the switch cases of the reducer
2. reducers are separate:
- they are called by some event that triggers the dispatched action function (ex. increment) and reflect on the specific switch case to update the state accodringly

ex. <button onClick={() => dispatch(increment())}>+</button>


```sh
// actions.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// reducer.js
import { INCREMENT, DECREMENT } from './actions';

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 };
        case DECREMENT:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

export default counterReducer;

// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

export default store;
```


The Redux Toolkit way is much less verbose, there is no need to separate actions and reducers, making a seprate file for each reducer and each action with the vars to be used in the reducer and the functions to be dispatched and in turn trigger the reaction of the reducer: 

```sh
// slice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 }
  }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;
```