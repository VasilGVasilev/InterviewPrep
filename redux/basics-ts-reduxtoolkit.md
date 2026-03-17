## Redux Toolkit: how a slice is built

The mental model is: **one slice = one domain of state** (users, claims, policies). Each slice owns its shape, its defaults, and all the ways it can be mutated.

---

### 1. Define the shape (TypeScript interface)

```ts
export interface ClaimsState {
  current?: Claim;       // the active claim being filed
  list: ClaimBase[];     // all claims loaded from server
  progress: boolean;     // is a network request in flight?
  error?: string;        // last error message, if any
}
```

This is just a TS contract — it tells you exactly what lives in this slice.

---

### 2. Set the defaults (`initialState`)

```ts
const initialState: ClaimsState = {
  list: [],
  progress: false
};
```

This is what the state looks like before anything happens — on first load, or after a reset.

---

### 3. Write the reducers

Each reducer is a function: `(state, action) => void`. RTK wraps them with **Immer**, so you can write as if you're mutating the object directly, even though immutability is preserved under the hood:

```ts
setCurrentClaim: (state, action: PayloadAction<Claim>) => {
  state.current = { ...state.current, ...action.payload };
  // spread preserves existing fields, only overwrites what's passed in
}
```

The special case is a **full reset** — you return a new object instead of mutating:

```ts
resetClaimState: () => {
  return initialState; // returning replaces the whole state
}
```

---

### 4. `createSlice` wires it all together

```ts
const claims = createSlice({
  name: 'claims',       // prefixes action type strings: "claims/setCurrentClaim"
  initialState,
  reducers: { ... }
});
```

It auto-generates **action creators** from the reducer keys:

```ts
export const { setCurrentClaim, resetClaimState } = claims.actions;
// setCurrentClaim({ date: '...' }) → { type: 'claims/setCurrentClaim', payload: { date: '...' } }
```

And exports the **reducer function** to register in the store:

```ts
export default claims.reducer;
```

---

### 5. Register in the store

```ts
configureStore({
  reducer: {
    claims: claimsReducer,  // ← "claims" = the key in state tree
  }
})
```

The key here (`claims`) is what determines `state.claims` in `useSelector`. The `name` inside `createSlice` only affects action type strings (used in DevTools and middleware) — which is why the `'policies'` typo didn't break anything at runtime.

---

### 6. Async operations (`createAsyncThunk`)

For server calls, `createAsyncThunk` is used. It is **separate** from the slice — it dispatches the synchronous slice actions internally:

```ts
export const loadUserClaimsAsync = createAsyncThunk(
  'claims/loadUserClaimsAsync',
  async (_, { dispatch }) => {
    dispatch(setClaimProgress(true));           // ← calls slice reducer
    dispatch(setClaimList(await ServerAPI.listClaims())); // ← calls slice reducer
    dispatch(setClaimProgress(false));
  }
);
```

The thunk itself doesn't own any state — it just orchestrates calls to the slice's synchronous reducers.

---

### Summary flow

```
Component
  → dispatch(setCurrentClaim({ date: '...' }))   // action creator
    → Redux calls claims reducer with that action
      → Immer applies the mutation
        → state.claims.current.date = '...'
          → useSelector re-renders affected components
```


[docs seems similar](https://redux-toolkit.js.org/tutorials/quick-start)