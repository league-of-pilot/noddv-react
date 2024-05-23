import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { getMe } from './getMe.axios'

export const useCodeParamLogin = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const access_token = params.get('access_token') ?? ''
    const refresh_token = params.get('refresh_token') ?? ''
    const newUser = params.get('newUser')
    const verify = params.get('verify')
    console.log({ newUser, verify })
    // ở đây mình chỉ test UI cho trường hợp login
    // Trường hợp register thì bạn nào biết Front-end React có thể tự làm thêm UI cho nó nhé
    // Dựa vào new_user, verify để biết là user mới hay user cũ và đã verify email hay chưa
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    console.count('🚀🚀 useAuth L31 render')

    const controller = new AbortController()
    const tryGetMe = async () => {
      try {
        const res = await getMe(access_token, controller)

        const {
          data: { email }
        } = res
        localStorage.setItem('email-ddv', email)
        navigate('/')
      } catch (error) {
        if (isAxiosError(error) && typeof error.response?.status === 'number') {
          alert(error)
        }
        console.log('🚀 ~ error in code login:', error)
      }
    }

    tryGetMe()

    console.count('🚀🚀 useAuth L33 render')
  }, [params, navigate])
}

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' '),
    prompt: 'consent',
    access_type: 'offline'
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}

export const googleOAuthUrl = getGoogleAuthUrl()
