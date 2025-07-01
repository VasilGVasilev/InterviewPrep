What is scripting?
Scripting gives life to the front end. It can both be direct manipulation of the html that is hosted at the same place the script tag is or the script tag can be refering to another document hosted elsewhere.

and example of the second usecase would be if I develop some simple html where the user can input text into a textfield. This whole thing is hosted somewhere and a script with src attribute is what connects that to my website.

### remotely hosted textfield:

```js
(function () {
  // Prevent re-injection
  if (window.myWidgetInjected) return;
  window.myWidgetInjected = true;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #my-floating-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border: 1px solid #ccc;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      font-family: sans-serif;
      z-index: 9999;
    }

    #my-floating-widget input {
      padding: 8px;
      border: 1px solid #aaa;
      border-radius: 4px;
      width: 200px;
    }
  `;
  document.head.appendChild(style);

  // Create widget container
  const container = document.createElement('div');
  container.id = 'my-floating-widget';

  // Add text input
  container.innerHTML = `
    <input type="text" placeholder="Type something..." />
  `;

  // Append to body
  document.body.appendChild(container);
})();

```

the above is an IIFE hosted on somewhere.com and to embed it on our website we just add a script with a src attritbute:

### My website:
```js
<script src="https://somewhere.com/widget.js"></script>
```

### NB, you use iframe when you want full isolation

```js
<iframe src="https://somewhere.com/widget.html" style="width: 400px; height: 600px; border: none;"></iframe>
```