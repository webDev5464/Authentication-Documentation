import { useContext } from "react"
import { PopupContext } from "../../Router"

export default function Home() {
  const { loginUsername } = useContext(PopupContext)
  return (
    <>
      <h1>{loginUsername}</h1>
    </>
  )
}