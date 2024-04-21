### SSR non SPA

When a web page is loaded in a browser, a new JavaScript execution context (or environment) is created for that page. This environment includes all the JavaScript variables, functions, and other data associated with the page.

When you navigate away from the page (for example, by following a link or redirect), the browser discards the page's JavaScript environment to free up memory. This includes all the JavaScript data, as well as any running timeouts or intervals. This is why all JavaScript execution is stopped when you leave a page.

When you return to the page, the browser creates a new JavaScript environment for the page from scratch. It doesn't remember the previous JavaScript environment or any data from it. This is why there's no carryover of timeouts, intervals, or other data when you return to a page.

This behavior is part of the JavaScript language specification and is implemented by all web browsers. It's designed to keep web pages isolated from each other and to prevent memory leaks.

### SPA

In a single-page application (SPA) like those built with React, the situation is a bit different. When you navigate between "pages" in a SPA, you're not actually loading a new page from the server. Instead, the SPA is using JavaScript to update the current page's content. Because of this, the JavaScript environment is not discarded and recreated when you navigate between pages.

This means that timeouts, intervals, and other JavaScript data can persist across "page" changes in a SPA. However, if you navigate away from the SPA entirely (for example, by entering a new URL or closing the browser), the JavaScript environment will still be discarded, just like with a traditional multi-page application.
