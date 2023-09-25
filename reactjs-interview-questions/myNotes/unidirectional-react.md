React has unidirectional data flow from parent to child only. Per se, children cannot change upstream data to make a change in their parent components. But using callbacks enables us to to a child to parent change:

```sh

// Parent component
const Parent = () => {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div>
      <Child onIncrement={handleIncrement} />
    </div>
  );
};

// Child component
const Child = ({ onIncrement }) => {
  return (
    <button onClick={onIncrement}>Increment</button>
  );
};



```

Child changes the parent's state

