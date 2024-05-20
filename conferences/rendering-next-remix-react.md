React Server Components (usable since v19)

It is important to note that before the official release of the concept of react server components since react v19 which utilizes streaming instead of on client side building of the react tree with js/css bundles and html.

Next.js Server Components (SSR with its own RSC)

A feature within the Next.js framework that integrates React Server Components with Next.js's full suite of features, including routing, data fetching, and server-side rendering. MIND that next wants a server-sider rendering first approach (use client directive for only minimal client side components).

Remix loader/actions (SSR)

While Remix does not use the React Server Components concept, it achieves similar goals through its own mechanisms. Data fetching is handled by loader functions, which run on the server before the component renders. This ensures that the data is ready by the time the component is rendered, avoiding the need for additional client-side data fetching.