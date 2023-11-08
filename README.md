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
  console.log("Database Connected Successfully...");
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
const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server Connected : http://localhost:${PORT}`);
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
})

const userModel = mongoose.model("userData", createUserSchema)

module.exports = userModel
```

## 📌 create User Register

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
const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server Connected : http://localhost:${PORT}`);
})
```

#### 🔺 How to bcrypt password?

