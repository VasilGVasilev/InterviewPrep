1. polymorphism:

```sh
type ButtonOrLinkProps = 
| React.ButtonHTMLAttributes<HTMLButtonElement>
| React.AnchorHTMLAtrributes<HTMLButoonElement>;

const ButtonOrLink = (props: ButtonOrLinkProps) => {
    if("href" in props){
        return <a {...props} />;
    }
    return <button {...props} />;
};
```

There are a lot of errors regarding the Anchor's href being a string and also potential event in a callback, thus:

```sh
type ButtonOrLinkProps = 
| (React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
})
| (React.AnchorHTMLAtrributes<HTMLButoonElement> & {
    as: "a";
})

const ButtonOrLink = (props: ButtonOrLinkProps) => {
    if("href" in props){
        return <a {...props} />;
    }
    return <button {...props} />;
};
```

TS not always knows what to expect from the children of HTMLAttributes.

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.

In this situation, you can use a type assertion to specify a more specific type:

```sh
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```