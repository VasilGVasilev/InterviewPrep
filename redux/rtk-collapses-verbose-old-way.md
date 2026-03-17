## Classic Redux vs RTK — the full picture

### Old Redux (verbose, explicit)

In classic Redux you wrote all three pieces **separately by hand**:

**1. Action type constants**
```ts
const SET_CLAIM_LIST = 'claims/setClaimList';
const SET_CLAIM_PROGRESS = 'claims/setClaimProgress';
```

**2. Action creators** (functions that return action objects)
```ts
const setClaimList = (list) => ({
  type: SET_CLAIM_LIST,
  payload: list
});
```

**3. The reducer** (a big switch statement reacting to action types)
```ts
function claimsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLAIM_LIST:
      return { ...state, list: action.payload };
    case SET_CLAIM_PROGRESS:
      return { ...state, progress: action.payload };
    default:
      return state;
  }
}
```

**4. Register it**
```ts
combineReducers({ claims: claimsReducer })
```

**5. Async (redux-thunk manually)**
```ts
const loadClaimsAsync = () => async (dispatch) => {
  dispatch(setClaimProgress(true));
  const data = await ServerAPI.listClaims();
  dispatch(setClaimList(data));
  dispatch(setClaimProgress(false));
};
```

That's ~5 separate files/sections for one slice of state. Every time you add a field you touch all of them.

---

### RTK collapses it — same concepts, less boilerplate

`createSlice` generates steps 1–4 automatically from one object:

```ts
reducers: {
  setClaimList: (state, action) => { ... }
}
```
This one entry produces:
- the **action type string** `"claims/setClaimList"` (from `name` + key)
- the **action creator** `setClaimList(payload)` → exported from `.actions`
- the **reducer case** that handles that action type → exported from `.reducer`

So conceptually:

```ts
createSlice = action constants + action creators + switch-case reducer
                    ↑ all three, auto-generated from the same definition
```

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

### How the pieces still flow the same way


The underlying Redux data flow is **identical** — RTK just removes the ceremony:

```ts
Classic:   dispatch(setClaimList({date:'...'}))
                → action object {type: 'claims/setClaimList', payload: {...}}
                    → claimsReducer switch hits SET_CLAIM_LIST case
                        → returns new state

RTK:       dispatch(setClaimList({date:'...'}))
                → same action object (auto-generated)
                    → same reducer logic (Immer-wrapped, mutation style)
                        → same new state
```

Nothing changed conceptually — the arrow trail is identical.

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

### The "slice is a reducer" part

When you write:

```ts
const claims = createSlice({ name: 'claims', initialState, reducers: {...} });
export default claims.reducer;
```

`claims.reducer` is a **normal reducer function** — `(state, action) => state`. It's the exact same thing you would have written as a giant switch statement. RTK just built it for you from the `reducers` map.

Then in the store:

```ts
configureStore({
  reducer: {
    claims: claims.reducer   // ← this IS the switch-statement reducer, just auto-built
  }
})
```

`configureStore` internally calls `combineReducers` on that map, exactly like classic Redux did.

---

### Thunks: same concept, less wiring

`createAsyncThunk` replaces manual `redux-thunk` middleware setup. The callback receives `dispatch` and `getState`, exactly as before — you call your synchronous slice actions inside it:

```ts
// "thunk" = a function that returns a function — this concept is unchanged
createAsyncThunk('claims/load', async (_, { dispatch, getState }) => {
  dispatch(setClaimProgress(true));    // ← calls the auto-generated action creator
  dispatch(setClaimList(await ...));   // ← same
  dispatch(setClaimProgress(false));
})
```

The difference is you don't manually configure thunk middleware — RTK includes it by default in `configureStore`.

---

### Side-by-side mapping

| Classic Redux | RTK equivalent |
|---|---|
| `const SET_X = 'slice/setX'` | auto-generated from slice `name` + reducer key |
| `const setX = (val) => ({ type: SET_X, payload: val })` | auto-generated, exported from `slice.actions` |
| `switch(action.type) { case SET_X: ... }` | the function body in `reducers: { setX: (state, action) => ... }` |
| `combineReducers({ x: xReducer })` | `configureStore({ reducer: { x: xReducer } })` |
| manual `redux-thunk` + thunk functions | `createAsyncThunk` |
| manual spread for immutability `{ ...state, x: val }` | Immer — write `state.x = val` directly |

The concepts are all still there — RTK just co-locates them and generates the repetitive parts.




My explanation:

```ts
const claims = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    resetClaimState: () => {
      return initialState;
    },
    setCurrentClaim: (state, action: PayloadAction<Claim>) => {
      state.current = { ...state.current, ...action.payload };
    },
    setClaimList: (state, action: PayloadAction<ClaimBase[]>) => {
      state.list = action.payload ?? [];
      state.listActive = [];
      state.listFinished = [];
      if (state.list.length) {
        state.listActive.push(0);
        state.listFinished.push(0);
      }
    },
    setClaimProgress: (state, action: PayloadAction<boolean | undefined>) => {
      state.progress = action.payload ?? false;
    },
    setClaimError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setCascoStep: (state, action: PayloadAction<number | undefined>) => {
      state.cascoStep = action.payload;
    }
  }
});
```

basics before RTK:

Type
Action creator and thunks
reducers

the reducers use the switch mechanism to match types and update state with objects set in action creators (and thunks) both of which are merely functions that return a play object with type and payload.


So what is what in the new RTK way:

each slice is set in the store.reducers and in that sense it reminds us of the reducers that have all of these types for when we dispatch an action creator.

reducers =~ type switchers

but also reducers in createSlice (mind the semantic similarity of slices set in store.reducers and the fact that the main thing of a slice is the reducer field) direclty have the action creators and directly update state without type being needed (type is actually construed via name and reducer key, but it is under the hood for the actual setting up)

**Thus, before you need types, action creators and then to make reducers with switch statements for each type to have payload updating the state mechanism, now it is all done in the slice key reducers. No need to set up matching types, you directly put the action creator name as a key and relate it with a state updating function - which state of this slice will be updatede via action.pauload.**


Before: 
reducer has a type that will update with some data. you dispatch to update the state, and you have to dispatch an action creator, this action creator has the specific type set and the data that will be used as a payload when the type of the reducer matches.

After:
reducer in slice in reducers has action creators that directly access the relecant substate to be updated (ex. state.list = action.payload or state.current = action.payload).**When you dispatch that action creator, it matches via auto genrated type again, but this time you do not manually set the types, it is done. you just set the action creator in the reducer direclty unlike before where you set the type, set the action creator and set the reducers all separately.**