Dispatch is the way that we actually change state. useState() is to access state, useDispatch() is to update that state. It is a mechanism which needs an action. 

Changing state involves passing in an action into the useDispatch instance so that this can later be passed onto the Redux store. There Redux runs the reducers with the dispatched action and the current state. 

Actions are object that represent *one way* of how the state should change.
(Actions can also be async ones and via redux thunk (modern) reflect the realities of updating state asynchroniously)

Reducers are pure functions that have '*all the ways* how the state should change. They react to the dispatched action **type** to update with the state with the relevant **payload**.

