The main difference is that REST API is a pull-based model, while webhooks are a push-based model. You ask the server via REST API HTTP methods for some resource and it gets delivered (client calls server). With webhooks (reverse API), you give your app's URL to the server to initiate the call (server calls client).

Control:
rest api - the client has control to do CRUDE operations on the server DB
webhooks - the client provides the server with an endpoint url and the server only has control to push a notification/alert to the client when it has the data ready

**In summary:**  
- Webhooks are mostly like alerts or notifications—your endpoint receives data when an event happens.
- REST APIs let you perform various actions (GET, POST, PUT, DELETE) and you control the interaction.
