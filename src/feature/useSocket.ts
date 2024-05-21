import { useEffect } from 'react'
import { io } from 'socket.io-client'

const initSocket = () => io(import.meta.env.VITE_API_URL)

export const useSocket = () => {
  useEffect(() => {
    // https://socket.io/docs/v4/client-initialization/#from-a-different-domain
    const socket = io('http://localhost:4007')
    return () => {
      socket.disconnect()
    }
  }, [])
}
