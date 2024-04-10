### UI communicates with Controllers via Promises even though it is one app

It seemed self-evident, but Symfony is a server-side rendering framework. Thus, even tho we can have our own javascript via Webpack:

.addEntry('app', './assets/app.js') 

and a class in app.js:

const wizard = new Wizard();

It is still server-side rendered which means any javascript we do on the client is to be sent as a promise via fetch to the Controller and then json_decoded in the Controller which in turn may make other requests to other servers.

- app.js
```php
    #decodeRequest(base64) {
        return fetch(this.#path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                front: base64,
                threshold: 20
            })
        });
    }
```

the connection between javascript manipulation and Controller happening via twig

- twig
```php
{% include './someTwig.html.twig' with {checkPath: path('somePath_decode')} %}
// and 
data-path="{{ checkPath }}"
```

- controller
```php
    /**
     * @Route("/someTwig", name="somePath_decode", methods="POST")
     */
    public function somePath_decode(Request $request): Response
    {
        $content = $request->getContent();
        $array = json_decode($content, true);
    }
```

### DOMContentLoaded
Symfony is a server-side rendering framework so be mindful if you use javascript DOM manipulation before the initial rendering. 


To ensure that the JavaScript code doesn't try to interact with the DOM before it's ready, you can wrap the code in a `DOMContentLoaded` event listener. Here's how you can do it:

```javascript
import './styles/app.scss';
import { Wizard } from "./kiosk/Wizard";

document.addEventListener('DOMContentLoaded', (event) => {
  const wizard = new Wizard();

  const debugWindow = document.getElementById("wizard-debug");
  if (debugWindow) {
      const debugToggle = debugWindow.querySelector(".button-toggle");
      if (debugToggle) {
          debugToggle.addEventListener("click", (e) => {
              debugWindow.classList.toggle("open");
          });
      }
  }
});
```

In this code, the `DOMContentLoaded` event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. The code inside the event listener will only run after the DOM is ready, so it can safely interact with DOM elements.