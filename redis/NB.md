Works inside RAM, so volatile, but not good for persistance, thus, main use case is caching.

Fetching data without redis but making a request for full data to the server with each fetch requires minimum of 150 ms per request:

```sh
const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId
    const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: {albumId}}
    )

    res.json(data)
})

app.listen(3000)
```

Add redis to cache info and get it from redis instead of server (mind that the next thing would be to keep cache up-to-date with ex. pub/sub)

To conceptualize:

We run redis on a virtual machine (locally port 6379)
We create an instance of it on our server (locally port 3000)
When data comes into the server (3000), it is redirected via the redis client instance (within 3000) to the redis server (6379) on its own virtual machine and stored/cahced there.


With redis caching after initial fetch from server DB, the fetching of the whole data takes 10x less - 15 ms.
```sh
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require("redis")

const redisClient = Redis.createClient()
redisClient
    .on('error', err => console.log('Redis Client Error', err))
    .connect();


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get("/photos", async (req, res) => {
    try {
        const cacheResults = await redisClient.get('photos');
        if (cacheResults) {
            console.log("Cache Hit");
            results = JSON.parse(cacheResults);
            res.json(results);

        } else {
            console.log("Cache Miss");
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/photos"
            )
            redisClient.set('photos', JSON.stringify(data))
            res.json(data);

        }

    } catch (error) {
        console.error(error);
    }

})

app.listen(3000)
```