const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose =require("mongoose")


const app = express()

const SERVER_PORT = process.env.SERVER_PORT || 3001
const CONNECTION_URL = "mongodb://kamea8288_db_user:5xfnfjauOXHVR8Pg@ac-jmwggch-shard-00-00.jyquwms.mongodb.net:27017,ac-jmwggch-shard-00-01.jyquwms.mongodb.net:27017,ac-jmwggch-shard-00-02.jyquwms.mongodb.net:27017/?ssl=true&replicaSet=atlas-aibr8p-shard-0&authSource=admin"

app.use(express.json())
app.use(express.urlencoded())


mongoose.connect(CONNECTION_URL, {
    dbName: "books"
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


app.use("/api/v1", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
