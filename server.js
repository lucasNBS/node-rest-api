// modules imported
require("dotenv").config()
const express = require("express")
const usersRouter = require("./routes/users")

// creating server
const app = express()

// setting midlewares
app.use(express.json())
app.use("/users", usersRouter)

// starting server
app.listen(process.env.PORT, () => console.log("Server is running!"))