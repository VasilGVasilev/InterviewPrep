Redis, being an in-memory data store, resides on the server where your application is hosted. So, in your case, the Redis cache is located on the same virtual machine where your app is hosted.

Here's how it works:

1. When you send a request to load a page (like a product listing) from your PC, the request is sent to the server hosting your app.
2. The server checks the Redis cache first. If the required data is present (in memory), it's returned to your PC quickly.
3. If the data isn't in the Redis cache, the server retrieves it from the main database (like MongoDB), stores it in the Redis cache for future requests, and then sends it back to your PC.

This setup allows the server to serve data faster than it could by querying the main database directly. **The data in the Redis cache is stored in the server's RAM**, making it much quicker to access than data stored on disk . (Redis is faster due to being on the RAM, the database may be on the same BE server as redis, but it is on disk)

The amount of memory Redis uses depends on the size and complexity of the data being cached. For instance, if you're caching large amounts of text or binary data, Redis could use a significant portion of the server's memory. However, Redis is designed to be efficient in its use of memory, so it should not consume more memory than necessary .

**Mind that Redis only optimizes data retrieval for the whole app, it puts in cache frequently fetched data for all users, it does not provide per user improved experience, for that you need session management**