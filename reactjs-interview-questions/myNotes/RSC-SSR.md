[React Server Components vs. Server-Side Rendering](https://www.thearmchaircritic.org/mansplainings/react-server-components-vs-server-side-rendering)

**Client Side Rendering vs Server Side Rendering.**
To show a page in CSR we need download of bundle, parse and render, while with SSR, there is no download.

Client side rendering is like server side rendering, they both use the HTML as a scaffold and hydrate it with JS bundle, but the difference is that SSR does the whole process on the server, while with CSR, it is done on the client. So, what makes SSR faster, well there is no downloading of the bundle on the client for it to parse it and render the page.

Thus, SEO is also better, since crawlers see the fully rendered page first instead of awaiting download and assembly.

**Server Side Rendering vs Static Site Generation**

While SSR is faster than CSR due to no download of JS bundle on the client, it still has some delay for parsing and rendering that it does for each request made by the client. To achieve even faster serving of pages, you need SSG, where the parsing and rendering is done during build time and the whole page is ready to be server as per request, instead of being built with every request.

Advantage of intial load time being faster:

So, in terms of intial load time, First Content Paint, the order of fastness is SSG > SSR > CRS.

Disadvantage of limiting flexibility:

SSG (and ISG)

SSG is fast and you can pass on dynamic data via getStaticProps(next.js), however, that is only for the first render. If that data changes, this will not re-render the page to have up-to-date info. A solution(next.js) is to do Incremental Static Regeneration, basically, updating SSG with revalidation clause:

plain SSG:
```sh
export default function Page({ data }) {
 // Render data...
}
 
// This gets called at build time
export async function getStaticProps() {
 // Fetch data from external API
 const res = await fetch(`https://.../data`)
 const data = await res.json()
 
 // Pass data to the page via props
 return { props: { data } }
}
```

ISR:
```sh
export async function getStaticProps({ params }) {
 // Fetch data for each dynamic route with the post `id`
 const res = await fetch(`.../${params.id}`);
 const post = await res.json();

 // Whatever is in the props object will be
 // passed to the HomePage component
 return {
   props: {
     post,
   },

   // Because we enabled revalidation, this page will be regenerated
   // when a user requests the page
   revalidate: 5
 };
}
```

SSR(and CSR)

SSR is faster for intial load, but subsequent updates are slower for the same reason the initial load is faster. Instead of the JS bundle being close to the browser and cached, as it will be in the case of CRS, with SSR, subsequent page reloads happen via requests to the server where the JS bundle is. 

Higher FCP score, same or worse TTI with SSR over CSR

So, it seems that SSR has the advantage of faster initial load time (FCP),but after that Time to Interactive (TTI) score is similar to traditional SPA app based on CSR if not worse due to the time it takes to communicate with the JS bundle on the server instead on the browser cache.

React Server Components - the best of both worlds.


RSC are the solution so that instead of having the whole page rendered on the server, you render the non-interactive parts, so that they have less intial loading time. Meanwhile the componentes that have user interactivity are rendered as per the CSR rule, the bundle to download on the client browser for specific CSR components being significantly smaller than if the whole page was based on CSR. So, far Next.js has a good approach in implementing RSC. All components are server rendered by default while client ones that have interactivity or using browser Web APIs are denoted as such with the directive 'use client'.

In summary, RSC reduces SSR to specific components instead of the whole page, thus, enabling the interplay of having some components with SSR, others with CSR.






OLD UNFINISHED THOUGHTS:

**RSC and SSR are not the same!**

React Server Components were implemented first and so far Next.js is the first big framework to implement SSR that adheres to the complete paradigm shift for React developers. 

**RSC**

Namely, RSC are rendered on the server, so you can query DB directly instead of the additional layer of communication between client and server. Thus, hooks such as useState and useEffect become irrelevant, since you add the fetched from the DB data directly into the JSX component of your app. The downside is inability to use Browser Web APIs like localstorage, bluetooth, web USB. If you want to use hooks or have client interactivity, it should be done on a client component.

**SSR**

Next.js provides server first components architecture, but you can use a declaration 'use client' at the top of your component to make it client component. Thus, bringing the best of both into one application. 

So, SSR relates to where the component is rendered, while RSC to what limiatations and advantages does the component start having by being rendered on the server.