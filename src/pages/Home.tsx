import { Link } from 'react-router-dom'
import './page.css'
import { useLogout } from '../feature/useAuth'
import VideoPlayer from '../feature/VideoPlayer'
import { LoginForm } from '../feature/LoginForm'
import { googleOAuthUrl } from '../feature/useCodeParamLogin'

export default function Home() {
  const { isAuthenticated, logout } = useLogout()

  return (
    <>
      <h1>Google OAuth 2.0 demo</h1>
      <div className='read-the-docs'>
        {isAuthenticated ? (
          <>
            <span>Hello my friend, you are logged in.</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <div>
            <div className='login-google-btn'>
              <Link to={googleOAuthUrl}>Login with Google</Link>
            </div>
            <LoginForm />

            <hr />
          </div>
        )}
        <VideoPlayer />
      </div>
    </>
  )
}
