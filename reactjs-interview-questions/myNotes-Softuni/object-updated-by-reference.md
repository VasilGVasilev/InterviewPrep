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