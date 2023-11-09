import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export default function Navigation() {
  const [showOption, setShowOption] = useState(false)

  const showUserAuthOption = () => {
    setShowOption(!showOption)
  }
  return (
    <nav className="light">
      <div className="headingNavigate">
        <div>
          <h2>Authentication</h2>
        </div>
        <div className="navigate">
          <NavLink to={"/"}>Home</NavLink>
        </div>
      </div>

      <div className="registerLoginOptionBtn light" onClick={showUserAuthOption}>
        Register & Login
      </div>

      <div className={`userOption ${showOption ? "userOption-Enable" : "userOption-Disable"}`}>
        <ul>
          <li><Link onClick={showUserAuthOption} to={"UserRegistration"}>Register</Link></li>
          <li><Link onClick={showUserAuthOption} to={"UserLogin"}>Login</Link></li>
        </ul>
      </div>
    </nav>
  )
}