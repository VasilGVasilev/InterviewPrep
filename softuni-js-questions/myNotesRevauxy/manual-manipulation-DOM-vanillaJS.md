Logic when manipulating the DOM directly.

1. Create an instance of the class is enough to trigger its inner execution logic (this class has an event being called, but you can have such that execute some functionality within themselves):

```js
const myComponent = new MyComponent('#my-element');
myComponent.enable();
```

2. define the class and some logic(usually catching the html element and adding an event listener):

```js
class MyComponent {
    constructor(elementSelector) {
        this.element = document.querySelector(elementSelector);
    }

    enable() {
        this.element.addEventListener('click', () => {
            // Handle click event
        });
    }
}
```

### Selecting a DOM element:

When you select a DOM element using `querySelector` and assign it to a variable (in this case, `this.#countdown`), **you're not just storing the current state of that element. You're actually storing a reference to the DOM element itself.**

This means that when you modify properties of `this.#countdown`, such as `textContent`, you're directly modifying the corresponding DOM element in the webpage. 