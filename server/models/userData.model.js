const mongoose = require("mongoose")

const createUserSchema = mongoose.Schema({
  username: String,
  email: String,
  pass: String
})

const userModel = mongoose.model("userData", createUserSchema)

module.exports = userModel
