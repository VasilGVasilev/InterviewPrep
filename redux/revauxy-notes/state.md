### How do we access state?

useSelector 

```js
const user = useSelector(state => state?.user);
```

### But what is this '.user'

- a slice in the modern Redux Toolkit era:


STORE.js
```js
import counterReducer from '../store/counterReducer'

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => { //automatically generated action creators and handling action types internally
      state.name = action.payload 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(counter.actions.increment, (state, action) => {
      state.age += 1
    })
  },
})

const store = configureStore({
  reducer: {
    counter: counter.reducer, //see 2. below
    user: user.reducer,
  },
})
```

1. createSlice Function: This is used to create a slice of the Redux state. Each slice can contain multiple reducers (referred to as "case reducers" within the slice), which handle actions within that slice. The createSlice function automatically generates action creators and action types for these case reducers. The reducers field in createSlice is an object where keys are action types and values are reducer functions that handle these actions.

2. Slice's .reducer Property: When you create a slice using createSlice, it returns an object that contains several properties. One of these properties is **.reducer**, which is the **combined reducer function for that slice**. This combined reducer function knows how to handle all the actions defined in the reducers object of the slice. It's essentially the slice's reducer that manages its portion of the state.

.reducer is the combined result of all the reducers of a the slice.

In fact, you can even directly define the reducers and combine them in the configure store without the creation of a slice:
```js

const reducer = {
    user,
    ...
};

const store = configureStore({
    reducer,
})
```
In this case you will have to manually handle action types and action creators, see basic-redux-setup.md for createAction helper function.

### It all goes does to pre oder post Redux Toolkit:

- Pre requires manual action types and action creators and the reducers are directly set into the configureStore() without slices.

- Post has the novel concept of slices where we have automatic creation of action creators and thus a bit of knowledge is necessary how the reducers get combined in createSlice() and are ready for the configureStore().

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  age: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserAge: (state, action) => {
      state.age = action.payload;
    },
  },
});

export const { setUserName, setUserAge } = userSlice.actions;
export default userSlice.reducer;
```

In this example, createSlice automatically generates action creators (setUserName, setUserAge) which are then exported but also uses the very same names to create the reducers which are combined and set into the userSlice.reducer object to use.

[for official pre post redux toolkit](https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today)