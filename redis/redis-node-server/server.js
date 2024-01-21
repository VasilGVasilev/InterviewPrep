const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require("redis")

const redisClient = Redis.createClient({url: "redis://127.0.0.1:6379"})
redisClient
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

const DEFAULT_EXPIRATION = 3600




const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/photos", async (req, res) => {
    const photos = await getOrSetCache("photos", async () => {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/photos"
        )
        return data
    })
    res.json(photos)


})

function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error)
            if (data != null) return resolve(JSON.parse(data))
            let freshData = await cb()
            redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}
app.listen(3000)