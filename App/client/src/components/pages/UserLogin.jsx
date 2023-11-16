import { useState } from "react"
import { BiHide, BiShowAlt } from "react-icons/bi"
import Popup from "../modules/Popup"

export default function UserLogin() {
  const [hidePass, showPass] = useState(true)

  const showHideBtn = () => {
    showPass(!hidePass)
  }

  const [inputVal, setInputVal] = useState({
    email: "",
    pass: ""
  })

  const formHandler = () => {

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

      <Popup />
    </section>
  )
}