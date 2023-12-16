// modules imported
const express = require("express")
const router = express.Router()
const User = require("../models/user")

// User storage ( local )
const usersList = []

// get all users
router.get("/", (req, res) => {
  try {
    const users = usersList
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get user by id
router.get("/:id", getUser, (req, res) => {
  res.send(res.user)
})

// create user
router.post("/", (req, res) => {
  const { username, email, password } = req.body

  const user = new User(
    username,
    email,
    password
  )

  try {
    usersList.push(user)
    res.status(204).json({ message: "User created!" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// update user
router.patch("/:id", getUser, (req, res) => {
  const { username, email, password } = req.body
  const { id } = req.params

  const newUser = {
    username: username ? username : res.user.username,
    email: email ? email : res.user.email,
    password: password ? password : res.user.password,
    id: res.user.id
  }

  const index = usersList.findIndex(user => user.id == id)

  try {
    usersList.splice(index, 1, newUser)
    res.json({ message: `User ${res.user.id} updated` })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete user
router.delete("/:id", getUser, (req, res) => {
  const { id } = req.params
  const index = usersList.findIndex(user => user.id == id)

  try {
    usersList.splice(index, 1)
    res.json({ message: `User ${res.user.id} deleted` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// midleware function to get user
function getUser(req, res, next) {
  const { id } = req.params
  let user

  user = usersList.find(user => user.id == id)

  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
  } catch (err) {
    return res.status(500).json({ messsage: err.message })
  }

  res.user = user
  next()
}

// exporting module
module.exports = router