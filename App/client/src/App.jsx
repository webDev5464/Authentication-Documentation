import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/modules/Navigation"
import Home from "./components/pages/Home"
import UserRegistration from "./components/pages/UserRegisteration"
import UserLogin from "./components/pages/UserLogin"

export default function App() {
  return (
    <Router>
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="UserRegistration" element={<UserRegistration />} />
          <Route path="UserLogin" element={<UserLogin />} />
        </Routes>
      </main>
    </Router>
  )
}