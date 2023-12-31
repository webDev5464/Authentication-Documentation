const express = require("express")
const cors = require("cors")
const userRegistration = require("./controllers/userRegister.controller")
const loginUserController = require("./controllers/userLogin.controller")
const adminLogin = require("./controllers/adminLogin.controller")

const app = express()
app.use(express())
app.use(express.json())
app.use(cors())

//! Database Connection
require("./configs/database.config")

//! user register controller
app.post("/userRegister", userRegistration)
//! user login controller
app.post("/userLogin", loginUserController)
//! admin login controller
app.post("/adminLogin", adminLogin)

//! localhost server listening
app.listen(8080, () => {
  console.log("Server Connected...");
})