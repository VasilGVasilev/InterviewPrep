It seemed self-evident, but Symfony is a server-side rendering framework. Thus, even tho we can have our own javascript via Webpack:

.addEntry('app', './assets/app.js') 

and a class in app.js:

const wizard = new Wizard();

It is still server-side rendered which means any javascript we do on the client is to be sent as a promise via fetch to the Controller and then json_decoded in the Controller which in turn may make other requests to other servers.