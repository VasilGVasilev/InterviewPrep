### How does JS actually make a page interactive?

Since all code is usally in one place, one can easily make the mistake that we use js to manipulate the html+css.
However, this is false. In fact, js manipulates the DOM, which is a representation of the webpage created by the browser based on html/css/js.

For example, when you use 
```js
document.getElementById('my-div') 
```
in JavaScript, you're not directly interacting with the HTML.

**Manipulate the node based on the html element, but not manipulating the actual html element.**

Instead, you're asking the browser to find the node in the DOM that corresponds to the element with the ID 'my-div'. You can then read or change the properties of this node to interact with the element.

Understanding this is pivotal if one thinks that the js changes the html, because it logically cannot. However the DOM is a different species that can be dynamically manipulated based on user interaction.