**RSC and SSR are not the same!**

React Server Components were implemented first and so far Next.js is the first big framework to implement SSR that adheres to the complete paradigm shift for React developers. 

**RSC**

Namely, RSC are rendered on the server, so you can query DB directly instead of the additional layer of communication between client and server. Thus, hooks such as useState and useEffect become irrelevant, since you add the fetched from the DB data directly into the JSX component of your app. The downside is inability to use Browser Web APIs like localstorage, bluetooth, web USB. If you want to use hooks or have client interactivity, it should be done on a client component.

**SSR**

Next.js provides server first components architecture, but you can use a declaration 'use client' at the top of your component to make it client component. Thus, bringing the best of both into one application. 

So, SSR relates to where the component is rendered, while RSC to what limiatations and advantages does the component start having by being rendered on the server.