What does it mean to have a microservices based app and not a monolithic?

Basically, it means you add a layer of abstraction to your monolithic structure. Having separate services/actions folder in your monolithic app is your starting point. IF you have it, you have separation of services in a directory with separate modules. But those are just the requests the client makes, you also need an api folder for your responses. 

Having these two is still considered to be a monolithic structure, because it is all mashed-up in one folder -> getUser(), getPosts() - are just modules/files in the same folder of the same app. This is tight coupling, but then again at least there is some coupling. This coupling is the starting point on what you have to do more to update to a microservices architecture. You need to have the whole **users** or **posts** service be a single unit, with its own dependencies. To do that, you need to separate it and build a REST API system that specifically deals with this particluar service, ex. **users**. 

But how do you communicate with those newly build singluar entities - you create a *super structure* supervising the interaction between client and those miscroservices on the server? The answer - a proxy or also known as Gateway API.

Gateway API

The API gateway then routes the HTTP request to the corresponding microservice. The HTTP request is received by the microservice that hosts its own REST API. Each microservice is running within its own AppDomain and has directly access to its own dependencies such as databases, files, local transaction, etc. All these dependencies are only accessible for that microservice and not to the outside world. In fact microservices are decoupled from each other and are autonomous. This also means that the microservice does not rely on other parts in the system and can run independently of other services.

Patterns

Patterns become extremely important in microservices architecture since as you can imagine, the interconnection between services, services and clients, and services and DB, can become extremely complex and the **data needs to be up-to-date while also loose-coupling is maintained.**

**[CQRS](https://martinfowler.com/bliki/CQRS.html)**

The mainstream approach people use for interacting with an information system is to treat it as a CRUD datastore. By this I mean that we have mental model of some record structure where we can create new records, read records, update existing records, and delete records when we're done with them. In the simplest case, our interactions are all about storing and retrieving these records.

As our needs become more sophisticated we steadily move away from that model. We may want to look at the information in a different way to the record store, perhaps collapsing multiple records into one, or forming virtual records by combining information for different places. On the update side we may find validation rules that only allow certain combinations of data to be stored, or may even infer data to be stored that's different from that we provide.

The change that CQRS introduces is to split that conceptual model into separate models for update and display, which it refers to as Command and Query respectively following the vocabulary of CommandQuerySeparation. The rationale is that for many problems, particularly in more complicated domains, having the same conceptual model for commands and queries leads to a more complex model that does neither well.

**Basically, a step further than simple storing and retrieving records via CRUD, ex validation rules.**

We could expand the last sentence, by emphasizing the difference between data-centric and event-driven architecture. It is almost self-explainatory, and it is a popoular opinion that event-driven architecture is to be preferred, *since web applications are more inline with reacting to clients' events than to be data-centric log/register of data.*

**[Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)**

Event Sourcing ensures that all changes to application state are **stored as a sequence of events**. Not just can we query these events, we can also use the **event log** to reconstruct past states.



**[Messaging Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)**


**Outbox Pattern**

It ensures that a message was sent (e.g. to a queue) successfully at least once. With this pattern, instead of directly publishing a message to the queue, we store it in temporary storage (e.g. database table). We’re wrapping the entity save and message storing with the Unit of Work (transaction). By that, we’re ensuring that the message won’t be lost if the application data is stored. It will be published later through a background process. This process will check if there are any unsent messages in the table. When the worker finds any, it tries to send them. After it gets confirmation of publishing (e.g. ACK from the queue), it marks the event as sent.

Why does it provide at-least-once and not exactly-once? Writing to the database may fail (e.g. it will not respond). When that happens, the process handling outbox pattern will try to resend the event after some time and try to do it until the message is correctly marked as sent in the database.

**Inbox Pattern** 

It is similar to Outbox Pattern. It’s used to handle incoming messages (e.g. from a queue). Accordingly, we have a table in which we’re storing incoming events. Contrary to outbox pattern, we first save the event in the database, then we’re returning ACK to queue. If save succeeded, but we didn’t return ACK to queue, then delivery will be retried. That’s why we have at-least-once delivery again. After that, an outbox-like process runs. It calls message handlers that perform business logic.

You can simplify the implementation by calling handlers immediately and sending ACK to the queue when they succeeded. The benefit of using additional table is ability to quickly accept events from the bus. Then they’re processed internally at a convenient pace minimising the impact of transient errors.
