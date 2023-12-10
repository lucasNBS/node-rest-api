// modules imported
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const usersRouter = require("./routes/users")

// creating server
const app = express()

// connecting and testing database connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Database"))


// setting midlewares
app.use(express.json())
app.use("/users", usersRouter)

// starting server
app.listen(process.env.PORT, () => console.log("Server is running!"))