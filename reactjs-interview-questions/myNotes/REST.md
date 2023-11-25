## REST (Representational State Transfer) and HTTP (HyperText Transfer Protocol)

REST is not a standard or a specification, but rather a set of constraints that, when followed, can make your system easier to understand and use. Some of the key characteristics of REST include a uniform interface, statelessness, cacheability, and a client-server architecture.

HTTP is a protocol used for transferring data over the internet. HTTP provides a set of methods (GET, POST, PUT, DELETE) that can be used to interact with resources on the web. These methods map to CRUD operations (Create, Read, Update, Delete)

RESTful APIs, for example, are typically built on top of HTTP. When a RESTful API is called, the server transfers **a representation of the state of the requested resource** to the client. This representation can be in a JSON format, XML, or HTML format. The server uses the HTTP method provided by the client to determine what operation to perform on the resource.

Here is an example of how a RESTful API might work using HTTP:

```sh
GET /users/123 HTTP/1.1
Host: example.com
```

In this example, the client is making a GET request to the server to retrieve the user with the ID of 123. The server would then respond with a representation of the user's state, such as:

```sh
HTTP/1.1 200 OK
Content-Type: application/json
{
 "id": 123,
 "name": "John Doe",
 "email": "john.doe@example.com"
}
```

In this response, the server is sending a JSON representation of the user's state back to the client 