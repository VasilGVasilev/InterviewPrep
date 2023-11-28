# Random notes on React specifics:

- useState vs this.setState

updating objects via this.state (class components) will merge, not overwrite like with functional components:

**update with this.setState**:

```sh
this.setState({ selected: { id: 1, name: 'Foobar' } });  

this.setState({ selected: { name: 'Barfoo' }});
```

->

```sh
{ selected: { id: 1, name: 'Barfoo' } }; 
```

**update with useState()**:

```sh
{ selected: { name: 'Barfoo' } }; 
```


- good recap of [class components](https://www.w3schools.com/react/react_class.asp)

in a class you have state, props for data and to render this data the lifecycle methods: mounting, updating, unmounting

mounting means putting elements on the DOM, so most imporant is render (constructor, getDerivesStateFromProps, componentDidMount are the others)

updating again needs render but also has constructor, getDerivesStateFromProps, componentDidUpdate, getSnapshotBeforeUpdate()

unmounting means removing component from DOM and has only one built-in method -> componentWillUnmount()

- setting props as a state

Usually, it is either via props or via state and useEffect() in functional components that we deal with data, not combining them, but if you have to set props as a state, you have to use getDerivedStateFromProps (class components) or useEffect (functional components), because change of props will not automatically trigger a change of state (you change state explicitly via this.setState or setState).

- useState operates via closure

useState hook lets you persist information stored even during re-render, unlike, a simple variable storing, which will be lost at the moment browser re-renders content; this is accomplished via closures.