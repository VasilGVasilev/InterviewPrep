## Class JS

### Object vs Class
/Objects have properties (key:value pairs), classes have fields and methods/

-   fields and methods
    notice that the field can store values, it is like a variable but since it is in a class, it does not requirer let or const, it is a property.

### How do we create a class component? - Depends on what we need.

We can create a class like this:

```js
class SomeClass {
    someField = 42;

    printField() {
        console.log(this.someField);
    }
}
```

Notice how we did not use the constructor function, since it is no longer necessary, per se. If we want, it is all the same:

- Public field:

```js
class SomeClass {
    someField;

    constructor (someField){
        this.someField = 42;
    }

    printField() {
        console.log(this.someField);
    }
}
```

- Private field:

```js
class SomeClass extends BaseClass {
    #someField; //1

    constructor(props) {
        super(props); //2
        this.someField = 42; //1
    }

    printField() {
        console.log(this.someField);
    }
}
```

The main utility of a constructor is to implement props and add eventListeners, not that you cannot outside of it, but the constructor gets initialized first and evetnListeners are better to be init first, too.






## Class React

We need state and lifecycle:

**Props**

```js
class Car extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h2>I am a {this.props.color} Car!</h2>;
    }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Car color="red" />);
```

EQUIVALENT TO:

```js
class Car extends React.Component {
    render() {
        return <h2>I am a {this.props.color} Car!</h2>;
    }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Car color="red" />);
```

**State**

```js
class Car extends React.Component {
    constructor() {
        super();
        this.state = { color: "red" };
    }
    render() {
        return <h2>I am a {this.state.color} Car!</h2>;
    }
}
```

EQUIVALENT TO:

```js
class Car extends React.Component {
    state = { color: "red" };
    render() {
        return <h2>I am a {this.state.color} Car!</h2>;
    }
}
```

Changing state (use this.setState() with either constructor or field initalization of state):

(Notice that class state handling merges, while functional state handling replaces entirely state)

```js
class Car extends React.Component {
    constructor() {
        super();
        this.state = { color: "red" };
    }

    addGreen = () => {
        this.setState({ count: "green" });
    };

    render() {
        return (
            <div>
                <p>Color: {this.state.color}</p>
                <button onClick={this.addGreen}>Greenify</button>
            </div>
        );
    }
}
```

EQUIVALENT TO:

```js
class Car extends React.Component {
    state = { color: "red" };

    addGreen = () => {
        this.setState({ color: "green" });
    };

    render() {
        return (
            <div>
                <p>Color: {this.state.color}</p>
                <button onClick={this.addGreen}>Greenify</button>
            </div>
        );
    }
}
```

**Lifecycle methods**

- Mounting
the most important methods are constructor(), render() and componentDidMount() [executed in that order].

ComponentDidMount() is for functionality that must run only after the component is placed in the DOM -> some timer:

```js
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

- Updating

componentDidMount() - executes only after the update (in the following exmaple made by componentDidMount) has been rendered on the DOM:

```js
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  componentDidUpdate() {
    document.getElementById("mydiv").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <div id="mydiv"></div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

Summary:

Lifecycle methods in React class components are primarily used to perform actions at specific points in a component's lifecycle, which can help avoid rendering issues and optimize performance. As useEffect hook in functional components, lifecycle methods give access to Web APIs outside plain component logi, but it can also be used for some update of the DOM after the render.

componentDidMount is a lifecycle method in React class components that is invoked immediately after a component is inserted into the tree. It's a good place to insert any side effects such as network requests, subscriptions, timers, or manual DOM manipulations.


a fetch request:

```js
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('https://api.example.com/data')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { data, isLoading, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                {/* Render the fetched data */}
            </div>
        );
    }
}
```