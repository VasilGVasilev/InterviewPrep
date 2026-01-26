Imagine cooking:

Running code at **compile time** is like looking at the recipe for mistakes/bugs.
Running code at **build time** is like preparing the products, preheating the oven
Running code at **runtime** is like the actual cooking.

In the front end world, SSG and SSR are often spoken of and are also a perfect example of build time vs runtime of code execution.

- with SSG code is run at build time, all the data is fetched via, manipulated and served as stati html ready for hosting
- with SSR code is run at runtime, data is fetched dynamically

In that sense, Astro is a great tool for fully SSG experience, since it assembles the data even if written in React into ready to use HTML. It ships the React engine onto the CDN/server but it only gets used for "astro islands" when necessary. In comparison Next.js pays performance tax to have the React engine from the very start (+ the SPA like universal state highjacking).