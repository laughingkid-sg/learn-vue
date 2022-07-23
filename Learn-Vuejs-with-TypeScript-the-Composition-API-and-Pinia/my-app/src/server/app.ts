import express from "express"
import cors from "cors"
import { today, thisMonth, thisWeek, type Post } from "../posts"

const app = express()
app.use(cors({ origin: true, methods: "*" }))
app.use(express.json())

const allPosts = [today, thisWeek, thisMonth]

app.get("/posts", (req, res) => {
    res.json(allPosts)
})

app.post("/posts", (req, res) => {
    console.log(req.body)
    const post = { ...req.body, id: (Math.random() * 100000).toFixed()}
    allPosts.push(post)
    res.json(post)
})

app.listen(8000, ()=> {
    console.log("Listening on port 8000")
})