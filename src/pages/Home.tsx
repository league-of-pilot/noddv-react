import { Link } from "react-router-dom"
import "../app/App.css"
import reactLogo from "../assets/react.svg"
import { googleOAuthUrl, useLogout } from "../feature/useAuth"
import viteLogo from "/vite.svg"

export default function Home() {
  const { isAuthenticated, logout } = useLogout()
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <h1>Google OAuth 2.0</h1>
      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>Hello my friend, you are logged in.</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  )
}
