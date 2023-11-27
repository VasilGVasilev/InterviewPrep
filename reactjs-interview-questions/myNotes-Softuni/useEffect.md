```sh
const Songs = props => {
    const [songs, setSongs] = useState([])    
    fetch(url)
        .then(resp => resp.json())
        .then(data => this.setState()    
        return()
}
```

BUT SIDE EFFECTs:
- On every re-render of <Songs />, a HTTP request will be sent which is unlikely to be wanted.
- The state will be reset by the fetch.
- An infinite loop is executed as setSongs() will execute a re-render which leads to a fetch each time.

SOLUTION FOR SIDE EFFECTs: useEffect() is to be used for side-effects executed in the render cycle.

```sh
const Songs = props => {
    const [songs, setSongs] = useState([])   
    useEffect(() => {
        fetch(url)
        .then(resp => resp.json())
        .then(data => this.setState()
        })   
    return()
}
```

HERE, useEffect() is executed after every render cycle (both the render and every re-render)

To prevent infinite loop side effect, a second argument is called:
```sh
useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => this.setState()
    }, [])
```

The first argument expected by the useEffect Hook, is a callback function where you write the code to 
be executed. 
The second is an array [] called a dependency array. 

- If the array is omitted, the callback function will run every time the code changes. ---> infinite fetch render loop 
- If the array is empty, the callback function will run once. /Initialization empty/ ---> like  componentDidMount()
- If there is a value provided, the callback function will run each time the value changes. ---> like componentDidUpdate()