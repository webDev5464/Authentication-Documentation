import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/modules/Navigation"
import Home from "./components/pages/Home"
import UserRegistration from "./components/pages/UserRegisteration"
import UserLogin from "./components/pages/UserLogin"
import { createContext, useState } from "react"
import AdminLogin from "./components/admin/AdminLogin"
import AdminLoginSuccess from "./components/admin/AdminLoginSuccess"

export const PopupContext = createContext()

export default function App() {
  const [popupMessage, setPopupMessage] = useState("")
  const [popupDisable, popupEnable] = useState(false)
  const [directLogin, setDirectLogin] = useState(false)
  const [loginUsername, setLoginUsername] = useState("")

  return (
    <Router>
      <PopupContext.Provider value={{
        popupMessage,
        setPopupMessage,
        popupDisable,
        popupEnable,
        directLogin,
        setDirectLogin,
        loginUsername,
        setLoginUsername
      }}>
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="UserRegistration" element={<UserRegistration />} />
            <Route path="UserLogin" element={<UserLogin />} />
            <Route path="Admin" element={<AdminLogin />} />
            <Route path="Admin/AdminLoginSuccess" element={<AdminLoginSuccess />} />
          </Routes>
        </main>
      </PopupContext.Provider>
    </Router>
  )
}
