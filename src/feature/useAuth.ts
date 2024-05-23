import { useCallback } from 'react'

export const useLogout = () => {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('email-ddv')

    window.location.reload()
  }, [])

  return { isAuthenticated, logout }
}
