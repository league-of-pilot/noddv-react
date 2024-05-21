import { useEffect } from 'react'
import { Socket, io } from 'socket.io-client'

const initSocket = () =>
  io(
    import.meta.env.PROD
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL
  )

const addSocketListen = (socket: Socket) => {
  socket.on('connect', () => {
    console.log(`🚀 ~ user ${socket.id} connect`)
  })

  socket.on('disconnect', reason => {
    console.log(`🚀 ~ user ${socket.id} disconnect`)
    console.log(reason)
  })
}

export const useSocket = () => {
  useEffect(() => {
    // https://socket.io/docs/v4/client-initialization/#from-a-different-domain
    const socket = initSocket()
    addSocketListen(socket)

    return () => {
      socket.disconnect()
    }
  }, [])
}
