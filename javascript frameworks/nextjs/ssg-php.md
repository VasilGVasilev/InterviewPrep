# the following shows how a php based ssg can achieve the same effects next js ssg has out of the box

It involves Manual DOM and History API manipualtion

A PHP Static Site Generator (SSG) can achieve a **Single Page Application (SPA) effect**—navigation without a full page reload—by relying heavily on **client-side JavaScript** (just like Next.js does for its "hydration" and client-side routing).

Since the PHP SSG only outputs static HTML, CSS, and JavaScript files, the "no full page reload" behavior must be implemented entirely in the browser using modern web APIs.

Here is the general approach:

-----

## 1\. Client-Side Routing with JavaScript

The core of the effect is intercepting navigation events and manually loading the new content.

### Intercept Link Clicks

You need JavaScript to:

1.  **Select all relevant anchor tags** (`<a>` elements).
2.  **Add an event listener** to them (or use event delegation) that listens for the `click` event.
3.  In the event handler, call `event.preventDefault()` to stop the browser's default behavior (which is a full page reload).

### Fetch the New Page Content

Instead of a full reload, you use the browser's **Fetch API** (or `XMLHttpRequest`) to asynchronously retrieve the HTML content of the new page's static file:

```javascript
// Example of fetching the new page's content
async function loadNewPage(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        // Proceed to extract and inject content
    } catch (error) {
        console.error('Error fetching page:', error);
        // Fallback to full page reload or show an error
        window.location.href = url;
    }
}
```

### Update the DOM (Content Injection)

Once the HTML for the new page is fetched, you must parse it (e.g., using a temporary `DOMParser` or a simple regex for critical sections) and **inject the new content** into the main content area of your current page.

  * You'll typically only want the new page's **main content**, not the header, footer, or navigation, as those usually remain the same.
  * The PHP SSG can aid this by generating static files where the main content is wrapped in an easily identifiable container (e.g., `<main id="page-content">...</main>`).

-----

## 2\. Managing the Browser History

A crucial part of achieving the SPA effect is updating the URL without a page reload and enabling the back/forward buttons:

### Update the URL and History State

Use the **History API** to change the URL shown in the browser's address bar without triggering a full page request.

```javascript
// After successfully injecting the new content
const newUrl = // ... the URL that was fetched;
const title = // ... the title of the new page;

window.history.pushState({}, title, newUrl);
document.title = title; // Update the document title
```

### Handle Browser Navigation

Listen for the `popstate` event, which is fired when the user clicks the browser's **back or forward buttons**.

```javascript
window.addEventListener('popstate', (event) => {
    // Re-run your content loading logic based on window.location.pathname
    // to load the previously or newly visible page content.
    loadNewPage(window.location.pathname);
});
```

-----

## 3\. Re-run Client-Side Logic

Since only a portion of the DOM is replaced, any **JavaScript that was specific to the new page** (e.g., an image carousel, a dynamic form) will not automatically run, as the script tags in the fetched content aren't executed when injected via `innerHTML`.

You must:

1.  **Extract and re-execute** any necessary `<script>` tags from the fetched HTML.
2.  **Manually initialize** any page-specific JavaScript after the new content is successfully injected.

