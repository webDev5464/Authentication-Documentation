const userData = require("../models/userData.model")
const bcrypt = require("bcryptjs")

const loginUserController = async (req, res) => {
  let findUser = await userData.findOne({ email: req.body.email })

  if (findUser) {
    let realPass = await bcrypt.compare(req.body.pass, findUser.pass)

    if (realPass) {
      res.send({ success: true, message: `User Login Successfully \n${req.body.email}`, userData: findUser })
      console.log(`User Login From : ${req.body.email}`);
    } else {
      res.send({ success: false, message: "Please Check your password" })
      console.log(`User enter wrong password : ${req.body.email}`);
    }
  } else {
    res.send({ success: false, message: "User Not found. Please Register" })
    console.log(`User Not Found`);
  }
}

module.exports = loginUserController
