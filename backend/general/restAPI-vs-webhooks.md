The main difference is that REST API is a pull-based model, while webhooks are a push-based model. You ask the server via REST API HTTP methods for some resource and it gets delivered (client calls server). With webhooks (reverse API), you give your app's URL to the server to initiate the call (server calls client).

Control:
rest api - the client has control to do CRUDE operations on the server DB
webhooks - the client provides the server with an endpoint url and the server only has control to push a notification/alert to the client when it has the data ready (instead of calling the restaurant, you leave your phone and they call you)

typical rest api call - my server calls their server to get/post etc data
webhooks - my server provides them with an API call for them to make a request which I respond to


Example:

company A has all insurance policies of their clients
comapny B has all the doctors schedules

the user want to book an appointment. company A provides a webhook to company B so that when the user books, the following happens:

company B is asked to book the doctor and if avaivable (company B knows/validates), it then asks back company A via the webhook if the user requesting a book has a valid policy -> company A responds via the webhook to company B and company B validates the booking fully. 

**In summary:**  
- Webhooks are mostly like alerts or notifications—your endpoint receives data when an event happens.
- REST APIs let you perform various actions (GET, POST, PUT, DELETE) and you control the interaction.
