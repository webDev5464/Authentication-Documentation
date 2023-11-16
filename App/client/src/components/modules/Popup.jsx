import { useContext } from "react"
import { PopupContext } from "../../App"
import { Link } from "react-router-dom"

export default function Popup() {
  const { popupDisable, popupMessage, directLogin } = useContext(PopupContext)
  return (
    <div className={popupDisable ? "popup activePopup" : "popup popupDisable"}>
      <div>
        <h3>{popupMessage}</h3>
      </div>

      <hr style={directLogin ? { display: "block", margin: "10px 0" } : { display: "none" }} />

      <div style={directLogin ? { display: "block", margin: "0 30px" } : { display: "none" }}>
        <h3>You have to login! <span><Link to={'/UserLogin'} style={{ color: "tomato" }}>Yes</Link></span></h3>
      </div>
    </div>
  )
}