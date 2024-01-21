Works inside RAM, so volatile, but not good for persistance, thus, main use case is caching.

Fetching data without reddis but making a request for full data to the server with each fetch requires minimum of 150 ms per request:

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