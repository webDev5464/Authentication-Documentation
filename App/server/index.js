const express = require("express")
const cors = require("cors")
const userRegistration = require("./controllers/userRegister.controller")

const app = express()
app.use(express())
app.use(express.json())
app.use(cors())

//! Database Connection
require("./configs/database.config")

//! post user register data
app.post("/userRegister", userRegistration)

//! localhost server listening
app.listen(8080, () => {
  console.log("Server Connected...");
})