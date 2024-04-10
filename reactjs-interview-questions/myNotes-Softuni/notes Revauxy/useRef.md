Why do we use useRef -> to reference a value not needed for rendering.
Most common use case is to access a DOM node and manipulate it somehow.
Note, that **class components** being classes means have instances and can 'forward' refs from parent to child, while **function components** are plain JSX and need the accessory hood forwardRef. Class components have properties and methods. 

It's like state but changing the value does not cause a re-render:

state

```sh
import { useState } from 'react';

export default function Counter() {
  let [state,setState] = useState(0);

  function handleClick() {
    setState(state=>state+1)
    alert('You clicked ' + state + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```
This however will logout 0 on the first click, because the alert shows the state from the intial render state=0, performs a state update which will be visible by the same logic on the subsequent click

**Using ref will show the immediatelly set value, because ref is just an object whose .current property can be changed directly at any time, while state does not render the change immediately due to React batching state updates.**

DOM node referencing 

```sh
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```