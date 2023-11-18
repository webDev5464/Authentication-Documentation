import { useContext, useEffect, useRef, useState } from "react"
import { BiHide, BiShowAlt } from "react-icons/bi"
import Popup from "../modules/Popup"
import axios from "axios"
import { PopupContext } from "../../Router"
import { useNavigate } from "react-router-dom"

export default function UserLogin() {
  let navigate = useNavigate()
  let autoFocus = useRef()
  const { setPopupMessage, popupEnable, setLoginUsername } = useContext(PopupContext)
  const [hidePass, showPass] = useState(true)

  useEffect(() => {
    autoFocus.current.focus()
  }, [])

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
    setPopupMessage(result.data.message)
    popupEnable(true)
    setTimeout(() => {
      popupEnable(false)
    }, 2000)

    if (result.data.success == true) {
      navigate("/")
      setLoginUsername(`Hello ${result.data.userData.username}`)
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
        <h2>User Login</h2>
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