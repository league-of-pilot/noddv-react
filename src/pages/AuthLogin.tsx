import { LoginForm } from '../feature/LoginForm'
import { googleOAuthUrl } from '../feature/useCodeParamLogin'

export default function AuthLogin() {
  return (
    <div>
      <div className='login-google-btn'>
        <a href={googleOAuthUrl}>Login with Google</a>
        <div>placeholder - not working</div>
      </div>
      <LoginForm />
    </div>
  )
}
