const mongoose = require("mongoose")

const createUserSchema = mongoose.Schema({
  username: String,
  email: String,
  pass: String,
  author: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const userModel = mongoose.model("userData", createUserSchema)

module.exports = userModel
