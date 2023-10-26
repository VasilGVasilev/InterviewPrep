1. React top features:

- JSX, a syntax extension allowing for JS be written directly in the HTML;
- Unidirectional data flow
- Virtual DOM because real DOM manipulations are expensive

Dan Abramov's path to RSC is a good recap of React's [features](https://github.com/reactwg/server-components/discussions/5)

Note this about JSX - **Turning JSX into an HTML string is usually known as "Server-Side Rendering" (SSR).**

rough version of JSX to HTML transformation function /without actually working with function Components, only pure HTML attributes/:

2. Pure Components
Pure components are components that render the same output for the same state and props. To achieve them, we can use React.memo() to wrap the Component in the hook and thus, save up a comparison by the vDOM if there is no update of props.

3. State
State is an object that is capsulated in the Component and every change to it triggers a re-render, while props are a way to make a dependency injection with data into the Component.

4. Class components
Mind that class components are still used and you have to bind methods via **this** keyword:

```sh
class User extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("SingOut triggered");
  }
  render() {
    return <button onClick={this.handleClick}>SingOut</button>;
  }
}
```

Also, see passing parameters to callbacks of class components:

```sh
<button onClick={() => this.handleClick(id)} />
```

This is an equivalent to calling .bind:

```sh
<button onClick={this.handleClick.bind(this, id)} />
```

5. Inline conditional statements  {x?(y):(z)}:

```sh
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don't have unread messages.</h2>
  );
}
```

6. vDOM
The Virtual DOM (VDOM) is an in-memory representation of Real DOM.
Whenever any underlying data changes, the whole vDOM re-renders and compares with the last DOM representation, any differences are the nodes updated on the real DOM.