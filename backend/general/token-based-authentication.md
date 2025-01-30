

### Token-Based Authentication

In token-based authentication, the server issues a token (often a JSON Web Token or JWT) upon successful login. This token is then used to authenticate subsequent requests to the server. Here’s how it generally works:

1. **Login Request**: The client sends a login request with credentials (e.g., username and password) to the server.
2. **Token Issuance**: Upon successful authentication, the server generates a token and sends it back to the client.
3. **Storing the Token**: The client stores the token (e.g., in local storage or memory(persist in db or store in state and re-generate a token on each reopen of app)).
4. **Authenticated Requests**: For subsequent requests, the client includes the token in the request headers to authenticate the request.
5. **Token Validation**: The server validates the token and processes the request if the token is valid.