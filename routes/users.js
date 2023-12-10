// modules imported
const express = require("express")
const router = express.Router()
const User = require("../models/user")

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get user by id
router.get("/:id", getUser, async (req, res) => {
  res.send(res.user)
})

// create user
router.post("/", async (req, res) => {
  const { username, email, password } = req.body

  const user = new User({
    username: username,
    email: email,
    password: password
  })

  try {
    await user.save()
    res.status(204).json({ message: "User created!" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// update user
router.patch("/:id", getUser, async (req, res) => {
  const { username, email, password } = req.body

  if (username != null) {
    res.user.username = username
  }
  if (email != null) {
    res.user.email = email
  }
  if (password != null) {
    res.user.password = password
  }

  try {
    await res.user.save()
    res.json({ message: `User ${res.user.id} updated` })
  } catch (err) {

  }
})

// delete user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne()
    res.json({ message: `User ${res.user.id} deleted` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// midleware function to get user
async function getUser(req, res, next) {
  const { id } = req.params
  let user

  try {
    user = await User.findById(id)

    if (user == null) {
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