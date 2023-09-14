Javascript is traditionally function scoped.
```sh
function example() {
    var x = 10;
    if (x > 5) {
        var y = 20;
        console.log(y); // Output: 20
    }
    console.log(y); // Output: 20
}

example();
```

Since we use var, the scope of y is of the entire function example()

However, var overreaching the block scope of if() is no longer the case in Javascript.

With the introduction of let and const, we have block scoping in Javascript which make the above code result in a 'console.log-ed' error:

```sh
function example() {
    let x = 10;
    if (x > 5) {
        let y = 20;
        console.log(y); // Output: 20
    }
    console.log(y); // Error!!!
}

example();
```

Thus, Javascript is now similar to Java in being block-scoped language:

```sh
public class Example {
    public static void main(String[] args) {
        int x = 10;
        if (x > 5) {
            int y = 20;
            System.out.println(y); // Output: 20
        }
        System.out.println(y); // Error: y cannot be resolved to a variable
    }
}
```