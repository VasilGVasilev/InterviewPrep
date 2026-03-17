It's a **mix** — the pattern is community-established and RTK's own docs nudge you toward it, but the specific field names (`progress`, `error`) and the guard logic are custom conventions.

### What RTK docs actually recommend

The official RTK docs promote a pattern called **"loading state enum"** for async operations:

```ts
status: 'idle' | 'loading' | 'succeeded' | 'failed'
error?: string
```

And they show this used via `builder.addCase` with the three states `createAsyncThunk` auto-generates — `pending`, `fulfilled`, `rejected`:

```ts
createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(loadClaimsAsync.pending,   (state) => { state.status = 'loading'; })
      .addCase(loadClaimsAsync.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(loadClaimsAsync.rejected,  (state, action) => { state.error = action.error.message; })
  }
})
```

### What could be done instead

Skips `extraReducers` entirely and manually dispatches inside the thunk body:

```ts
dispatch(setClaimProgress(true));   // instead of .pending handler
dispatch(setClaimList(data));       // instead of .fulfilled handler
dispatch(setClaimError(e.message)); // instead of .rejected handler
```

Using `boolean` for `progress` instead of the `'idle'|'loading'|'succeeded'|'failed'` enum. It's simpler and works fine for this use case — you only ever need "is it loading or not". The enum approach is more useful when you need to distinguish `succeeded` from `idle` (e.g. to avoid showing "no results" before the first fetch completes).

### Bottom line

| Aspect | RTK docs suggest | This codebase |
|---|---|---|
| Per-slice loading/error | ✓ yes | ✓ yes |
| How to wire async | `extraReducers` + `pending/fulfilled/rejected` | manual `dispatch` inside thunk |
| Loading field type | `status: 'idle'\|'loading'\|...'` | `progress: boolean` |

The **concept** (per-slice async state) is well-established and encouraged. The **implementation** is a simpler custom variant of it.