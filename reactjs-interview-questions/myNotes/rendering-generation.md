An often misconception among most articles is how rendering and generation of sites interplay.

Rendering refers to the displaying the final output of the HTML, CSS and JS bundle. There are two places where this may happen - on the server or on the client. It seems that the only definite difference is that in CSR, there is no pre-rendered data, while with SSR, there is pre-rendered data sent to the client to view immediately. That helps with web crawlers and SEO as the page has a slightly more finished view if SSR than CSR. However, what matters to the user is hydration. Even though with SSR, we have some more data when initially loading, hydration is done on the clinet, be that SSR or CSR app. (I have had thoughts about that the website does not actually display faster if SSR, since the time to pre-redner on the server is still ti be factored in, but the idea is not that SSR makes it faster, rather makes rendering look more interactive, in CSR, we await a blank page to fully load and hydration, with SSR, we have at least some bit of the whole to be seen sooner, then the whole/hydration/).

So SSR just makes rendering seem more interactive - first a bit info, then whole.

One might say, well, traditional CSR is ineffective then, but why not use SSG with CSR. We still get a lot of the benefits of pre-rednering, actaully fully pre-build static files, but we also have interactivity in terms of accessing external data via CSR. 

The argument in favour of SSR is scale. If you are wanting pre-rendering and greater performance for dynamic data fetching (mind that if you fetch a lot of data and have a lot of interactivity, it is more optimal to do it per request /the ssr way/), why not go with SSR, per se. It is the optimised solution for what you are trying to assemble via ssg and csr.


Another very imporant thing about hosting: ssg don't need a server, rather a shared hosting provider to put your files, a ssg with csr is the same, but traditional csr and ssr needs a server which needs a VM.
