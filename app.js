import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cors from "cors";

const app = express()
const PORT = 3001

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'));

const corsOptions = {
    origin : ['http://localhost:3000', "http://localhost:3001"],
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/:id", (req, res) => {
    const {id} = req.params
    res.sendFile(__dirname + "/views/post.html")
})

app.get("/new", (req, res) => {
    res.sendFile(__dirname + "/views/create-post.html")
})

app.get("/:id/edit", (req, res) => {
    res.sendFile(__dirname + "/views/edit.html")
})


let startTimestamp = new Date()
app.listen(PORT, () => {
    console.log(`\n------ (${startTimestamp.getHours()}:${startTimestamp.getMinutes()}:${startTimestamp.getSeconds()}) ------\nFrontend server is listening on http://localhost:${PORT}/`)
})