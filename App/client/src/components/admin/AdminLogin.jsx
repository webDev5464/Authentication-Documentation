import { useContext, useEffect, useRef, useState } from "react"
import { BiHide, BiShowAlt } from "react-icons/bi"
import Popup from "../modules/Popup"
import axios from "axios"
import { PopupContext } from "../../Router"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
  const { setPopupMessage, popupEnable } = useContext(PopupContext)
  const [hidePass, setHidePass] = useState(true)
  let autoFocus = useRef()
  let navigate = useNavigate()

  useEffect(() => {
    autoFocus.current.focus()
  }, [])

  const showHideBtn = () => {
    setHidePass(!hidePass)
  }

  const [inputVal, setInputVal] = useState({
    email: "",
    pass: ""
  })

  const inputData = (e) => {
    const { name, value } = e.target
    setInputVal({ ...inputVal, [name]: value })
  }

  const formHandler = async (e) => {
    e.preventDefault()
    popupEnable(true)
    setTimeout(() => {
      popupEnable(false)
    }, 4000)
    const result = await axios.post("http://localhost:8080/adminLogin", inputVal)
    setPopupMessage(result.data.message)
    navigate("AdminLoginSuccess")
  }

  return (
    <section className="formParent">
      <div className="formHeading">
        <h2>Authorize Account Only</h2>
      </div>

      <form onSubmit={formHandler}>

        <div className="flex item-center inputLabel">
          <div className="w-150">
            <label htmlFor="email">Email :</label>
          </div>
          <div>
            <input type="email" name="email" required value={inputVal.email} onChange={inputData} ref={autoFocus} />
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
          <input type="submit" value="Login" />
        </div>
      </form>

      <Popup />
    </section>
  )
}