When one does a custom fetch request using the fetch API, one is prompted to input url and an object consisting of method, header and body. If it is same origin request, the url is best to be just the path, namely, a relative not an absolute URL:
```sh
fetch('/somepath/somesubpath',{})
```