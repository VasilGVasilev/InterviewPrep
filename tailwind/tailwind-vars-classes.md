#Dynamic variables and classes in Tailwind

Tailwind has a massive collection of pre-defined classes. When Tailwind parses your source files and sees a class that contains a dynamic value, it doesn’t recognize it. Therefore those styles are not compiled.

Tailwind is compiled at build time and variables via fetching come at runtime. However, you can still have variables within Tailwind, but those need to be Booleans that determine one or other pre-defined valid tailwind classes:


Working ✅
```sh
const navbarBackground = isTopOfPage && pathname === '/' ? "" : "bg-black shadow-[0_1px_1px_0_#FFFFFF]";
const navbarTop0 = pathname === '/' ? "top-0" : "";
    return(
        <nav className={`${navbarBackground} ${navbarTop0} fixed z-40 w-full py-6 transition`}>
        </nav>
)
```

Not working ❌
```sh
const navbarBackground = data.backgroundColor //from a fetch into some state value is #FFFFFF
    return(
        <nav className={`bg[${navbarBackground}] fixed z-40 w-full py-6 transition`}>
        </nav>
)
```

[explained](https://www.codeconcisely.com/posts/tailwind-css-dynamic-class/)