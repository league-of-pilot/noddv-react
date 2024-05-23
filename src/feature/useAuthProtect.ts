import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { getMe } from './getMe.axios'

export const useAuthProtect = () => {
  const [authState, setAuthState] = useState('pending')
  // const refresh_token = localStorage.get('refresh_token') ?? ''

  useEffect(() => {
    const controller = new AbortController()
    const access_token = localStorage.getItem('access_token') ?? ''

    const tryGetMe = async () => {
      try {
        const res = await getMe(access_token, controller)

        const {
          data: { email }
        } = res
        localStorage.setItem('email-ddv', email)

        setAuthState('isAuth')
      } catch (error) {
        if (isAxiosError(error) && typeof error.response?.status === 'number') {
          alert(error)
        }
        console.log('🚀 ~ error:', error)
        setAuthState('error')
      }
    }

    tryGetMe()

    return () => {
      controller.abort()
    }
  }, [])

  return authState
}
