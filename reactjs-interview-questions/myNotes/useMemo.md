```js
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

You need to pass two things to useMemo:

1. A calculation function **//() => filterTodos(todos, tab)//** that takes no arguments, like () =>, and returns what you wanted to calculate.
2. A list of dependencies **//[todos, tab]//** including every value within your component that’s used inside your calculation.

On the initial render, the value **//const visibleTodos//** you’ll get from useMemo will be the result of calling your calculation.

On every subsequent render, React will compare the dependencies with the dependencies you passed during the last render.
    -> If none of the dependencies have changed (compared with Object.is), useMemo will return the value you already calculated before. 
    -> Otherwise, React will re-run your calculation and return the new value.