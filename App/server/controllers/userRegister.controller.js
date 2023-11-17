//! require `models/userData.model.js`
const userData = require("../models/userData.model")
const bcrypt = require("bcryptjs")

const userRegistration = async (req, res) => {

  //* user already login? find!
  let existingUser = await userData.findOne({ email: req.body.email })
  let { username, email, pass } = req.body

  if (existingUser) {
    res.send({ success: false, message: "User Already Register" })
  } else {
    let hassPass = await bcrypt.hash(pass, 10)
    let registerDependency = userData({ username, email, pass: hassPass })
    const result = await registerDependency.save()

    if (result) {
      res.send({ success: true, message: "New user register successfully", userData: result })
      console.log(`New user register : ${req.body.email}`);
    } else {
      res.send({ success: false, message: "This user already register" })
    }
  }
}

module.exports = userRegistration