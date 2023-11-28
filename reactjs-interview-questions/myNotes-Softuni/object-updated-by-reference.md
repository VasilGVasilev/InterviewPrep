We update the object stored in users state by creating a new reference [], spreading the old state ...oldUsers and adding the new user:

```sh
const [users, setUsers] = useState([]);


...

userService.create(userData)
    .then(user => {
        setUsers(oldUsers => [...oldUsers, user]);
        closeHandler();
    });
```

In React it is a rule to return new reference when updating state. Thus, arrays and object which are mutable should be treated as immutable primitive values, namely, update to a new referance. 

If you update mutable values when dealing with state, you go against the whole idea of having states, since instead of oldState -> newState, you have one single endpoint of the mutable reference which when updated is altered directly, as opposed to creating a new state and substituting the old one.