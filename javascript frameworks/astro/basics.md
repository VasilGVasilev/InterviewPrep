
[good astro overview](https://youtu.be/XRe560_vVF0)

The main thing about Astro is its zero JS on inital load policy (no performance tax). But we need some components to work even upon initial load /some react animation, button/. Thus, we add the declaration client:load:
``js
<SomeComponent client:load>
``

- client:load is how you tell Astro: "This specific component needs its brain to function as soon as the page loads."

### How it works (The 3-Step Process)

- **Build Time (The "Snapshot")**: Astro runs your React component on your computer. it generates the HTML so the user doesn't see a blank space while the page loads.

- **The Delivery (The "Payload")**: Astro bundles the React library and your component's JavaScript and sends them to the browser alongside the HTML.

- **Runtime (The "Hydration")**: As soon as the browser finishes loading the page, it executes that JavaScript. React "claims" the HTML that is already there, hooks up the event listeners (like onClick), and the component becomes alive.


### Directives

client:load -> Important interactive UI (Nav bars, Search).

client:idle -> Low-priority stuff (Chat widgets, Newsletter popups).

client:visible -> Components "below the fold" (Photo carousels, heavy charts).

NB
Astro uses vite as an engine. Vite is bundless during development since it direclty uses ES modules on the browser making Hot Module Reload instant, also smaller production bundles. CRA uses webpack and that makes things more complex for configuration and slower/heavier as a bundle.