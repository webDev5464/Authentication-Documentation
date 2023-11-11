const mongoose = require("mongoose")

const createUserSchema = mongoose.Schema({
  fullDate: String,
  fullTime: String,
  username: String,
  email: String,
  pass: String
})

const userModel = mongoose.model("userData", createUserSchema)

module.exports = userModel
