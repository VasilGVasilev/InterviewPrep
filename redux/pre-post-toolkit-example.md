### PRE
```js
// Action Types
const SET_USER = 'SET_USER';

// Action Creator
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Thunk (async action creator)
const fetchUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  dispatch(setUser(data));
};

// Reducer
const initialState = { userName: '', email: '' };

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
```


### POST

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { userName: '', email: '' },
  reducers: {
    // non-async thunks, basically you add actions in reducers field
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    }
  }
});
```
NB Redux Toolkit v2.0 2026 has async thunks within the reducers field of createSlice:

```js
import { createSlice, nanoid } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [],
  },
  reducers: (create) => ({
    deleteTodo: create.reducer((state, action) => {
      state.todos.splice(action.payload, 1)
    }),
    addTodo: create.preparedReducer(
      (text) => {
        const id = nanoid()
        return { payload: { id, text } }
      },
      // action type is inferred from prepare callback
      (state, action) => {
        state.todos.push(action.payload)
      },
    ),
// ---------------------------------------------------;
    fetchTodo: create.asyncThunk(
      async (id, thunkApi) => {
        const res = await fetch(`myApi/todos?id=${id}`)
        return await res.json()
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos.push(action.payload)
        },
      },
    ),
// ---------------------------------------------------;
  }),
})

export const { addTodo, deleteTodo, fetchTodo } = todosSlice.actions
```

### BUT

Typing for the create.asyncThunk works in the same way as createAsyncThunk, with one key difference.

A type for state and/or dispatch cannot be provided as part of the ThunkApiConfig, as this would cause circular types.

Instead, it is necessary to assert the type when needed - getState() as RootState. You may also include an explicit return type for the payload function as well, in order to break the circular type inference cycle.



