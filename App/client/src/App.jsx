import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/modules/Navigation"
import Home from "./components/pages/Home"
import UserRegistration from "./components/pages/UserRegisteration"
import UserLogin from "./components/pages/UserLogin"
import { createContext, useState } from "react"

export const PopupContext = createContext()

export default function App() {
  const [popupMessage, setPopupMessage] = useState("")
  const [popupDisable, popupEnable] = useState(false)
  const [directLogin, setDirectLogin] = useState(false)

  return (
    <Router>
      <PopupContext.Provider value={{ popupMessage, setPopupMessage, popupDisable, popupEnable, directLogin, setDirectLogin }}>
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="UserRegistration" element={<UserRegistration />} />
            <Route path="UserLogin" element={<UserLogin />} />
          </Routes>
        </main>
      </PopupContext.Provider>
    </Router>
  )
}