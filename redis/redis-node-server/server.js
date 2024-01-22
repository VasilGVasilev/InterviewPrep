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