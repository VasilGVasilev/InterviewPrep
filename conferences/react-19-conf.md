### Better error reporting:

We're revamping the error overlay to support visualizing various **hydration error diff**, it could be the server & client mismatch, or bad html nesting that could break html semantic, any hydration errors react raised.


### Actions - server-side (form handling, better for logic and data security and no need for separate api endpoints) /remix and next js use it, redwood, on the other hand, has its form handling direclty onto the client with the *onSubmit(e.preventDefualt)* way


```js
// Invoice.js
export default function Invoice() {
  return (
    <>
      <Form method="post" action="create">
        <input type="text" name="company" />
        <input type="text" name="amount" />
        <button type="submit">Create</button>
      </Form>
      <Form method="post" action="update">
        <input type="text" name="company" />
        <input type="text" name="amount" />
        <button type="submit">Update</button>
      </Form>
    </>
  );
}

export async function action({ request }) {
  const body = await request.formData();
  const action = request.url.pathname.split('/').pop();

  if (action === 'create') {
    const invoice = await createInvoice(body);
    return redirect(`/invoices/${invoice.id}`);
  } else if (action === 'update') {
    const invoice = await updateInvoice(body);
    return redirect(`/invoices/${invoice.id}`);
  }
}
```

Why we astrayed from form actions -> user expect the state to not change when clicking, thus, we need a state which means client side form handling:

from this:

```html
<!-- HTML ACTION -->
<form action="/checkout">
```

to this:
```js
// EVENT HANLDER
<form 
    onSubmit={function onCheckout(){
        //...
    }}
>
```

Why use actions - interactive before hydration (for some reason Meta thinks that the users prefer full page load from blank to full rather than some info at a time, but not fully interactive from the get-go)

### No more forwardRef, ref could be passed into the component as a regular prop


### PlayList re-renders when we change the NowPlaying

```js
export function MusicPlayer({ allSongs }){
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <>
            <NowPlaying song={currentSong} onChange={setCurrentSong}>
            <PlayList song={allSongs} onChange={setCurrentSong}>
        </>
    )
}
```
**If a parent comopnent re-renders, all its children re-render, too**

Thus, pre react 19 we need to wrap in memo.

```js
const MemoPlayList = memo(PlayList);

export function MusicPlayer({ allSongs }){
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <>
            <NowPlaying song={currentSong} onChange={setCurrentSong}>
            <MemoPlayList song={allSongs} onChange={setCurrentSong}>
        </>
    )
}
```
Yet, adding a filtered Playlist not as a component but as as function still leaves the problem open.
```js
const filteredSongs = useMemo(() => allSongs.filter(filterFn), [allSongs])
```
Since we wrapped only the component -> now we have to wrap the function, too:

```js
const MemoPlayList = memo(PlayList);
const filteredSongs = useMemo(() => allSongs.filter(filterFn), [allSongs])

export function MusicPlayer({ allSongs }){
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <>
            <NowPlaying song={currentSong} onChange={setCurrentSong}>
            <MemoPlayList song={filteredSongs} onChange={setCurrentSong}>
        </>
    )
}
```


### Remix will be React Router v7

its an oversimplification to say that *Remix is just React Router with plugin* since it has  code splitting and optimised transitions

### SSR vs CSR

![SSRvsCSR](https://github.com/VasilGVasilev/InterviewPrep/blob/main/reactjs-interview-questions/images/SSR%20vs%20CSR.png)

- CSR

Server side REACT TREE gets rendered to a *js/css bundle + minimal html* which shipped (via JSON) to the client where the client side renderer uses the *js/css bundle + minimal html* to rebuild the REACT TREE

- SSR

Server side REACT TREE gets rendered to a *js/css bundle + complete html* which shipped (via JSON) to the client where the client side renderer uses the *js/css bundle + complete html* to rebuild the REACT TREE

**BOTH approaches rely that the react renderer will rebuild the REACT TREE client side be that with minimal or complete html.**

Concurrent React since React 18v makes it possible for a change in that model - react server components which allows react to utilize streaming. It sends the actual serialized (special JSON-like format) REACT TREE and the client side renderer understands this format so that it build the REACT TREE direclty withnout needing the js/css bundles + html.

**NB** RSC are never sent to the client, only their return value in the special JSON like serialized format => we can use server side functionality directly within the components (access DB, file system). in react 19, we can use async/await to render server components(mind that next.js had its own feature with similar functionality)

![RSC](https://github.com/VasilGVasilev/InterviewPrep/blob/main/conferences/images/RSC.png)

- RSC in action (with suspense to avoid lack blank page until full page is loaded)

![RSC-async/await](https://github.com/VasilGVasilev/InterviewPrep/blob/main/conferences/images/RSC-async%3Aawait.png)


- RSC in action (if you want client side functionality enable it within a wrapped client component that is designated by the 'use client' directive)

![RSC-use-client](https://github.com/VasilGVasilev/InterviewPrep/blob/main/conferences/images/RSC-use-client.png)

- how to pass fetched data from server component to client component
you can either fetch the data (async/await) in the wrapper server component and pass it as a prop to the client component or utilize the use API in its promise resolving branch, meaning you direclty fetch(no async/await) and pass on the promise which use API will resolve on the client side.

### RSC - improving readability


![RSC-better](https://github.com/VasilGVasilev/InterviewPrep/blob/main/conferences/images/RSC-better.png)