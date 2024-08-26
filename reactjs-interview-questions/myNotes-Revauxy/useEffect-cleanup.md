1.Initial render (mounting)
2.useEffect logic
3.unmounting (useEffect cleanup logic)

The need to use cleanup function in useEffect, I want to unlock orientation of a device for the duration of a component and to revert it back to being locked after the component is no longer active. Here comes the logic of mount and unmount. We want unlocking to happen only for the duration of the component being used, **so utilize useEffect**. We add functionality in the regular field **(logic executes on mount after initial render)** and then in the return of the useEffect, we add the reverting functionality **(the cleanup logic executes on unmount)**:

```js
// default for app is Orientation.lockToPortrait();


// in our specific component we will change that only FOR our component
    useEffect(() => {

        Orientation.unlockAllOrientations();
        return () => {
            Orientation.lockToPortrait();
        };
    }, [route])
```

- useEffect body: This code runs after the component mounts and re-runs whenever the dependencies in the array change. It's ideal for actions that need to happen after the component is rendered, like fetching data, setting up subscriptions, or adding event listeners.   

- useEffect cleanup function: This code runs before the component unmounts and also before the next useEffect execution if dependencies change. It's crucial for cleaning up side effects, like removing event listeners, canceling subscriptions, or clearing intervals to prevent memory leaks. 