/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useAuth } from "../feature/useAuth"

export default function Login() {
  console.count("🚀🚀 Login L5 render")
  useAuth()
  console.count("🚀🚀 Login L7 render")

  useEffect(() => {
    console.count("🚀🚀 simple useEff")
  }, [])
  //  Thật ra chỉ là 1 loading chờ useEffect run để navigate đi
  return <div>Login</div>
}
