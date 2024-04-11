ref is good if we want limited access to a DOM node, but if we want **the parent component to access the child component's methods** we must use useImperativeHandle:

```js
import React, { useRef, useImperativeHandle, forwardRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
    let inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
    }));

    return <input ref={inputRef} type="text" />;
});

const ParentComponent = () => {
    let childRef = useRef();

    const onButtonClick = () => {
        // Now, you can call `focus` directly on the child element
        childRef.current.focus();
    };

    return (
        <div>
            <ChildComponent ref={childRef} />
            <button onClick={onButtonClick}>Focus the input</button>
        </div>
    );
};

export default ParentComponent;
```
In the example above, we use inputRef to access the ChildComponent's input html element and a combination of childRef, forwardRef and useImperativeHandle (ref is childRef) to access the ChildComponent methods (here, focus).