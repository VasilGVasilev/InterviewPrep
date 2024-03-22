Logic when manipulating the DOM directly.

1. Create an instance of the class is enough to tirgger its inner execution logic (this class has an event being called, but you can have such that execute some functionality within themselves):

```sh
const myComponent = new MyComponent('#my-element');
myComponent.enable();
```

2. define the class and some logic(usually catching the html element and adding an event listener):

```sh
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