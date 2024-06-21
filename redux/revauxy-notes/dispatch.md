To understand dispatch, we have to reiterate what is redux for?

React gives us the useState hook to have state in out components.
It can have one setting function that updates the old state to a new one.
But what if we want more complex control that updates our state with specific values based on a specific 'command'?

- we use Redux

In redux we have a state.

dispatch is the way we update the state in the component.

"dispatch(action)"

dispatch is, in fact, triggering the store (A "store" is a container that holds your application's global state.) to utilize one of the reducers (reducers are usually combined and their names bare merely a semantic importance for readibility but are not needed to explicitly be scripted - (dispatch(reducer(action)))). This reducer then *considers* the action that is inputted and updates the state accordinly. It is important to note that the action should better be action creator, since actions rarely come without payload:

```js
// actions.js
import { ADD_ITEM } from './actionTypes';

export function addItem(item) {
  return { type: ADD_ITEM, payload: item };
}

// Usage
dispatch(addItem({ id: 1, name: 'Apple' }));
```

If action was merely an object, how would you pass in the {} in addItem. => you need an action creator function

So, if dispatch is about updating state, how do we initialize state and get it? 

see ./state.md