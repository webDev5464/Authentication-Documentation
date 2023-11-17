import { useContext, useEffect, useRef, useState } from "react"
// npm i react-icons
import { BiShowAlt, BiHide } from "react-icons/bi"
// npm i axios
import axios from "axios"
import Popup from "../modules/Popup"
import { PopupContext } from "../../App"

export default function UserRegistration() {
  const { popupEnable, setPopupMessage, setDirectLogin } = useContext(PopupContext)
  const [showUserMistake, setShowUserMistake] = useState(false)

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

    // minimum password length check
    if (inputVal.pass.length < 4) {
      setShowUserMistake(true)
    } else {
      setShowUserMistake(false)
      // pass end conPass not match!
      if (inputVal.pass !== inputVal.conPass) {
        // alert("Password end Confirm Password Does not match.")      
        setPopupMessage("Password and Confirm Password do not match.");
        popupEnable(true);

        setTimeout(() => {
          popupEnable(false)
        }, 2000);

      } else {
        try {
          const result = await axios.post("http://localhost:8080/userRegister", inputVal)

          // login successfully
          setPopupMessage(result.data.message);
          popupEnable(true);
          setDirectLogin(true)

          setTimeout(() => {
            popupEnable(false);
            setDirectLogin(false)
          }, 5000);

        } catch (error) {
          // Something's wrong
          console.error("Registration Failed:", error.message)
          setPopupMessage("Server Down!")
          popupEnable(true)
          setTimeout(() => {
            popupEnable(false)
          }, 10000)
        }
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

        <div style={showUserMistake == false ? { visibility: "hidden", margin: "0 0 10px 0" } : { visibility: "visible", margin: "0 0 10px 0", color: "tomato", textAlign: "center" }}>
          <p>Minimum 4 digits password require.</p>
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>
      </form>

      <Popup />
    </section>
  )
}