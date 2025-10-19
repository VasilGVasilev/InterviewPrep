### SSG

How does the /out directory look like so that pasting it in a CDN makes a website work:

ALL is in index.html.

index.html works in a Next.js SSG site:

- **Build-time render**: Next pre-renders the page at build time and writes a complete static HTML file (out/index.html). **That file contains the fully rendered DOM (SEO/visible content).**

- **Static asset links**: CSS and fonts are linked in the head (e.g. /_next/static/css/... and /_next/static/media/...). Those files are produced during build and must be served alongside index.html.

- **Runtime scripts and hydration**: The <script> tags at the bottom load Next’s JS chunks. When those load the React app is "hydrated" — React attaches event handlers and makes the page interactive (client-side routing, galleries, toggles, etc.). Without JS the HTML still shows but interactivity is lost.

- **Chunk loading and resource hints**: Next injects resource hints and small bootstrapping snippets (you saw self.__next_f.push([...])) to tell the runtime which chunks/fonts/styles to fetch and to coordinate async chunk loading.

- **Client navigation**: After hydration, Next’s router can intercept links and do client-side navigation (fetching chunks/data) to avoid full page reloads when moving between pages — but each route also exists as a static HTML file in out/ so full reloads still work.

- **Where dynamic data matter**s: If the page depends on runtime data (not pre-rendered), it either uses client-side fetches after hydration or needs SSR/ISR — otherwise the build-time HTML is static.

What you need to serve it correctly:
- Serve the whole out/ directory from a static HTTP server so paths like /_next/static/... resolve.
- Set correct Content-Type headers and allow caching for static assets.
- If you want SPA-style fallback for client-side routes, configure your host to return index.html for unknown paths (only if your client-side router expects that).

Quick local preview (from project root):
````sh
# serve the out/ directory on port 3000
cd /Users/vasilvasilev/Documents/github\ macbook\ air\ m4/tilia/out
python3 -m http.server 3000
# or
npx serve -s .
````

If you want, I can list which chunks/assets that index.html expects (files under out/_next/static) or check that they exist.