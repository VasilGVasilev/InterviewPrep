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