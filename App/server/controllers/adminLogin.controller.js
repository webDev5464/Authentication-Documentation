const bcrypt = require("bcryptjs")
const userData = require("../models/userData.model")

const adminLogin = async (req, res) => {
  let findAdmin = await userData.findOne({ email: req.body.email })

  if (findAdmin) {
    let realPass = await bcrypt.compare(req.body.pass, findAdmin.pass)
    if (findAdmin.author == true) {
      if (realPass) {
        console.log("Admin login successfully");
        res.send({ success: true, message: "Admin Login Successfully...", userData: findAdmin })
      } else {
        console.log("Wrong Password");
        res.send({ success: false, message: "Password dose not match" })
      }
    } else {
      console.log(`This user not authorize but try to login ${req.body.email}`);
      res.send({ success: false, message: "Only authorize account login." })
    }
  } else {
    console.log("User not found");
    res.send({ success: false, message: "Not Existing Admin or User" })
  }
}

module.exports = adminLogin
