import { useCallback, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const useLogout = () => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"))

  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    window.location.reload()
  }, [])

  return { isAuthenticated, logout }
}

const useAuth = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const access_token = params.get("access_token") ?? ""
    const refresh_token = params.get("refresh_token") ?? ""
    const newUser = params.get("newUser")
    const verify = params.get("verify")
    console.log({ newUser, verify })
    // ở đây mình chỉ test UI cho trường hợp login
    // Trường hợp register thì bạn nào biết Front-end React có thể tự làm thêm UI cho nó nhé
    // Dựa vào new_user, verify để biết là user mới hay user cũ và đã verify email hay chưa
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)
    navigate("/")
  }, [params, navigate])
}

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ].join(" "),
    prompt: "consent",
    access_type: "offline"
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}

const googleOAuthUrl = getGoogleAuthUrl()

export { googleOAuthUrl, useAuth, useLogout }
