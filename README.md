# 🎓 Authentication

- Two directory `client (frontend)` & `server (backend)`

## 📌 Installation Dependency

#### 🔺 Client side installation

```bash
npm create vite ./
```

```bash
npm i
```

```bash
npm i react-router-dom
```

#### 🔺 Server side installation

```bash
npm init
```

```bash
npm i express
```

```bash
npm i cors
```

****
****
****

## 📌 Server Setup `./server` (Server Side)

- create file `index.js`

**`index.js`**

```js
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express())
app.use(express.json())
app.use(cors())

//! localhost server listening
const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server Connected : http://localhost:${PORT}`);
})
```

## 📌 Connect with mongoDb database (Server Side)

- create new file `config/database.config.js`

**`database.config.js`**

```js
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/authentication").then(()=> {
  console.log("Database Connected...");
})
```

- `configs/database.config.js` require in file `index.js`

```js
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express())
app.use(express.json())
app.use(cors())

//! Database Connection
require("./configs/database.config")

//! localhost server listening
app.listen(8080, () => {
  console.log("Server Connected...");
})
```

## 📌 Create user model (Server Side)

- create new file `models/userData.models.js`

**`userData.models.js`**

```js
const mongoose = require("mongoose")

const createUserSchema = mongoose.Schema({  
  username: String,
  email: String,
  pass: String

  // default time set in database.
}, { timestamps: true })

const userModel = mongoose.model("userData", createUserSchema)

module.exports = userModel

```

## 📌 create User Register (Server Side)

- create new file `controllers/userRegister.controller.js`

**`userRegister.controller.js`**

```js
//! require `models/userData.model.js`
const userData = require("../models/userData.model")

const userRegistration = async (req, res) => {

  //* user already login? find!
  let existingUser = await userData.findOne({ email: req.body.email })

  let { username, email, pass } = req.body
  console.log(req.body);

  if (existingUser) {
    res.send({ success: false, message: "User Already Register" })
  } else {

    let registerDependency = userData({ username, email, pass })
    const result = await registerDependency.save()

    if (result) {
      res.send({ success: true, message: "New user register successfully", userData: result })
    } else {
      res.send({ success: false, message: "This user already register" })
    }
  }
}

module.exports = userRegistration
```

- `controllers/userRegister.controller.js` require in this file `index.js`

```js
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
```

#### 🔺 How to bcrypt password?

- install bcrypt

```bash
npm i bcryptjs
```

- **Modified** :- `controllers/userRegister.controller.js`

```js
//! require `models/userData.model.js`
const userData = require("../models/userData.model")
// ----Modified----
const bcrypt = require("bcryptjs")
// ----------------

const userRegistration = async (req, res) => {

  //* user already login? find!
  let existingUser = await userData.findOne({ email: req.body.email })

  let { username, email, pass } = req.body
  console.log(req.body);

  if (existingUser) {
    res.send({ success: false, message: "User Already Register" })
  } else {

    // ----Modified----
    let hassPass = await bcrypt.hash(pass, 10)
    let registerDependency = userData({ username, email, pass: hassPass })
    // ----------------
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
```

## 📌 Create userRegister from end connect with server (Client side)

- install package dependency

**Using Icons**

```bash
npm i react-icons
```

**axios install**

```bash
npm i axios
```

#### 🔺 User Register form code

```js
import { useEffect, useRef, useState } from "react"
// npm i react-icons
import { BiShowAlt, BiHide } from "react-icons/bi"
// npm i axios
import axios from "axios"

export default function UserRegistration() {

  // Auto focus
  const focus = useRef(null)
  useEffect(() => {
    focus.current.focus()
  }, [])

  // Show password end Hide password
  const [hidePass, showPass] = useState(true)
  const showHideBtn = () => {
    showPass(!hidePass)
  }

  // input value 
  const [inputVal, setInputVal] = useState({
    username: '',
    email: '',
    pass: '',
    conPass: ''
  })

  // submitForm
  const formHandler = async (e) => {
    e.preventDefault()

    // pass end conPass not match!
    if (inputVal.pass !== inputVal.conPass) {
      alert("Password end Confirm Password Does not match.")
    } else {
      try {
        const result = await axios.post("http://localhost:8080/userRegister", inputVal)
        alert(result.data.message)
      } catch (error) {
        console.error("Registration Failed:", error.message)
        alert("Registration Failed. Please try again.")
      }
    }
  }

  // D-Structure inputData
  const inputData = (e) => {
    const { name, value } = e.target
    setInputVal({ ...inputVal, [name]: value })
  }

  return (
    <section className="formParent">
      <div className="formHeading">
        <h2>Register Your Account</h2>
      </div>

      <form onSubmit={formHandler}>
        <div className="flex item-center inputLabel">
          <div className="w-150">
            <label htmlFor="username">Username :</label>
          </div>
          <div>
            <input type="text" name="username" required ref={focus} value={inputVal.username} onChange={inputData} />
          </div>
        </div>

        <div className="flex item-center inputLabel">
          <div className="w-150">
            <label htmlFor="email">Email :</label>
          </div>
          <div>
            <input type="email" name="email" required value={inputVal.email} onChange={inputData} />
          </div>
        </div>

        <div className="passInput">
          <div className="flex item-center inputLabel">
            <div className="w-150">
              <label htmlFor="pass">Password :</label>
            </div>
            <div>
              <input type={hidePass ? "password" : "text"} name="pass" required value={inputVal.pass} onChange={inputData} />
            </div>
          </div>

          <div onClick={showHideBtn} className="showHideBtn">{hidePass ? <BiHide /> : <BiShowAlt />}</div>
        </div>

        <div className="flex item-center inputLabel">
          <div className="w-150">
            <label htmlFor="conPass">Confirm Password:</label>
          </div>
          <div>
            <input type="text" name="conPass" required value={inputVal.conPass} onChange={inputData} />
          </div>
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </section>
  )
}
```

## 📌 Create login controller (Server side)

- Create new file `**userLogin.controllers.js**`

```js
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
```

#### 🔺 User login form (client side)

- Create new file `**UserLogin.jsx**`

```js
import { useState } from "react"
import { BiHide, BiShowAlt } from "react-icons/bi"
import axios from "axios"

export default function UserLogin() {  
  const [hidePass, showPass] = useState(true)

  const showHideBtn = () => {
    showPass(!hidePass)
  }

  const [inputVal, setInputVal] = useState({
    email: "",
    pass: ""
  })

  const formHandler = async (e) => {
    e.preventDefault()

    const result = await axios.post("http://localhost:8080/userLogin", inputVal)
    alert(result.data.message)
  }

  // D-Structure inputData
  const inputData = (e) => {
    const { name, value } = e.target
    setInputVal({ ...inputVal, [name]: value })
  }

  return (
    <section className="formParent">
      <div className="formHeading">
        <h2>Register Your Account</h2>
      </div>

      <form onSubmit={formHandler}>

        <div className="flex item-center inputLabel">
          <div className="w-150">
            <label htmlFor="email">Email :</label>
          </div>
          <div>
            <input type="email" name="email" required value={inputVal.email} onChange={inputData} />
          </div>
        </div>

        <div className="passInput">
          <div className="flex item-center inputLabel">
            <div className="w-150">
              <label htmlFor="pass">Password :</label>
            </div>
            <div>
              <input type={hidePass ? "password" : "text"} name="pass" required value={inputVal.pass} onChange={inputData} />
            </div>
          </div>

          <div onClick={showHideBtn} className="showHideBtn">{hidePass ? <BiHide /> : <BiShowAlt />}</div>
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>
      </form>      
    </section>
  )
}
```

## 📌 Admin login (server side)

#### 🔺 Admin login form (client side)