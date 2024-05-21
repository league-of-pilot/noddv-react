import { baseUrl } from './../app/app.const'
import axios, { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

export const useAuthProtect = () => {
  const [authState, setAuthState] = useState('pending')
  // const refresh_token = localStorage.get('refresh_token') ?? ''

  useEffect(() => {
    const controller = new AbortController()
    const access_token = localStorage.getItem('access_token') ?? ''

    const getMe = async () => {
      try {
        const res = await axios.get('/users/getMe', {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          baseURL: baseUrl,
          signal: controller.signal
        })
        console.log('🚀 useAuthProtect L17-data', res)
        setAuthState('isAuth')
      } catch (error) {
        if (isAxiosError(error) && typeof error.response?.status === 'number') {
          alert(error)
        }
        console.log('🚀 ~ error:', error)
        setAuthState('error')
      }
    }

    getMe()

    return () => {
      controller.abort()
    }
  }, [])

  return authState
}
