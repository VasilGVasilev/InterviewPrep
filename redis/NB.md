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