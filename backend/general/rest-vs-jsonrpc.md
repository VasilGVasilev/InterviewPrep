
Here’s how they differ in **practical terms when using Postman**:

---

## 🔷 1. **Request Structure**

### 🔹 REST API:

* You use **HTTP method and URL** to define the action.
* Params may be in the **URL**, **query string**, or **body** depending on the method.
* The **URL changes** depending on the resource.

**Example:**

```http
GET https://api.example.com/users/123
```

Or for `POST`:

```http
POST https://api.example.com/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

> 🔁 The action (`GET`, `POST`, etc.) is conveyed through the HTTP verb and the URL.

---

### 🔹 JSON-RPC API:

* Always uses `POST` (typically to a single endpoint like `/rpc`).
* The **action is inside the body** as the `"method"` name.
* Request format must follow the **JSON-RPC 2.0 spec**.

**Example:**

```http
POST https://api.example.com/rpc
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "getUser",
  "params": { "id": 123 },
  "id": 1
}
```

> 🧠 In JSON-RPC, the HTTP layer is just a transport—**everything is in the JSON body**.

---

## 🔷 2. **Endpoints**

* **REST API**: You typically have many endpoints, e.g., `/users`, `/users/123`, `/orders/42/items`.
* **JSON-RPC API**: Usually just **one endpoint** like `/rpc` or `/api`.

---

## 🔷 3. **Use in Postman**

| Feature            | REST API                              | JSON-RPC API                                        |
| ------------------ | ------------------------------------- | --------------------------------------------------- |
| Method             | Uses `GET`, `POST`, `PUT`, etc.       | Usually just `POST`                                 |
| URL structure      | Varies by resource                    | Single endpoint                                     |
| Body format        | JSON or form-data (varies by method)  | Always JSON-RPC formatted JSON                      |
| Headers            | Typical REST headers (e.g., `Accept`) | Mostly just `Content-Type: application/json`        |
| Response structure | Usually direct JSON object or array   | Wrapped in JSON-RPC object with `result` or `error` |

---

## 🔚 Summary

| Question                      | REST                        | JSON-RPC                            |
| ----------------------------- | --------------------------- | ----------------------------------- |
| Multiple endpoints?           | ✅ Yes                       | ❌ No (usually just one)             |
| HTTP method matters?          | ✅ Yes (`GET`, `POST`, etc.) | ❌ No (almost always `POST`)         |
| Action in URL or method name? | ✅ URL & HTTP verb           | ❌ In JSON body `"method"`           |
| Format strict?                | No specific standard        | Yes — JSON-RPC spec                 |
| Easy to test in Postman?      | ✅ Very                      | ✅ But you must format body manually |

So yes — while you **can use Postman for both**, the **request body and style differ** significantly. JSON-RPC requires a more **manual** setup of the request body to conform to its specification. REST is generally **more intuitive** for most developers using Postman.


To understand what makes an API **RESTful** and why **JSON-RPC** is **not RESTful**, we need to look at the core principles of REST.

---

### ✅ What Makes an API RESTful?

REST (**RE**presentational **S**tate **T**ransfer) is an architectural style defined by Roy Fielding in his PhD dissertation. A **RESTful API** adheres to the following principles:

1. **Statelessness**
   Each request from the client must contain all the information needed to process it. The server does not store session state.

2. **Client-Server Separation**
   The client and server operate independently. The client only concerns itself with the user interface, while the server handles data processing and storage.

3. **Uniform Interface**
   A standardized way of interacting with resources, typically involving:

   * **Resource identification** (via URIs, e.g., `/users/1`)
   * **Standard HTTP methods**:

     * `GET` – retrieve
     * `POST` – create
     * `PUT` / `PATCH` – update
     * `DELETE` – remove
   * **Self-descriptive messages** (e.g., using standard HTTP headers and status codes)

4. **Resource-Based**
   Everything is a resource (users, orders, etc.), and each has a unique URL.

5. **Cacheability**
   Responses should indicate whether they can be cached to improve performance.

6. **Layered System**
   A REST client cannot ordinarily tell whether it is connected directly to the end server or an intermediary.

---

### ❌ Why JSON-RPC is *Not* RESTful

**JSON-RPC** is a remote procedure call (RPC) protocol encoded in JSON. <mark>**It's designed to invoke methods (functions) on a server rather than operate on resources.**</mark>

Here's why it violates REST principles:

| REST Principle             | JSON-RPC Behavior                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Resource-based URIs**    | Uses a single endpoint (e.g., `/api`) for all actions.                                         |
| **HTTP methods semantics** | Uses only `POST` regardless of operation.                                                      |
| **Standard status codes**  | Often returns `200 OK` for errors, embedding error info in the body instead.                   |
| **Uniform interface**      | Treats endpoints like method calls, e.g., `"method": "getUser"`, rather than using `/users/1`. |
| **Stateless**              | Can be stateless, but not by design—it depends on implementation.                              |
| **Cacheability**           | Typically not cacheable by default.                                                            |

---

### 🧪 Example Comparison

#### RESTful API

```http
GET /users/1
```

Returns:

```json
{
  "id": 1,
  "name": "Alice"
}
```

#### JSON-RPC

```http
POST /api
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "getUser",
  "params": { "id": 1 },
  "id": 1
}
```

Returns:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "id": 1,
    "name": "Alice"
  },
  "id": 1
}
```

---

### 🔚 Summary

| Feature        | RESTful API                          | JSON-RPC                      |
| -------------- | ------------------------------------ | ----------------------------- |
| Focus          | Resources (nouns)                    | Actions/methods (verbs)       |
| URLs           | Multiple, resource-based             | Single endpoint               |
| HTTP Verbs     | Meaningful use (`GET`, `POST`, etc.) | Only `POST`                   |
| Protocol Usage | Leverages HTTP fully                 | Uses HTTP as a transport only |
| RESTful?       | ✅ Yes                                | ❌ No                          |

So, JSON-RPC is not RESTful because it doesn't follow the REST principles—it’s more about calling functions on a server than manipulating resources using standard web semantics.
