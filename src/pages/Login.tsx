/* eslint-disable no-unused-vars */
import { useAuth } from "../feature/useAuth"

export default function Login() {
  useAuth()
  //  Thật ra chỉ là 1 loading chờ useEffect run để navigate đi
  return <div>Login</div>
}
