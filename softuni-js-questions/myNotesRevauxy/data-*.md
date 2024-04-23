Very conveniant way to store info about a html element and then access it via queryselecting that very element.

There are a few ways to create or update a `data-*` attribute on an HTML element in JavaScript:

1. **Using the `dataset` property**: This is the method you're currently using. The `dataset` property provides access to all `data-*` attributes on an element as properties of an object. You can create or update a `data-*` attribute by assigning a value to the corresponding property. Simply, setting the input.dataset.old with value will update OR create it if non is existant.

    ```javascript
    input.dataset.old = newValue;
    ```

2. **Using the `setAttribute` method**: This method allows you to create or update any attribute on an element, not just `data-*` attributes. You need to provide the full attribute name (including the `data-` prefix) and the value.

    ```javascript
    input.setAttribute('data-old', newValue);
    ```
