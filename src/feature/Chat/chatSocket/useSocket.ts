import { useEffect } from 'react'
import { addSocketListen, socket } from './socketInit'

// Vì viết dạng singleton nên việc disconnect này sẽ disconnect socket toàn app
// Tuy nhiên nếu connect cũng chỉ connect vào 1 api socket duy nhất

export const useSocket = (payload?: { [key: string]: unknown }) => {
  const token = payload?.['Authorization'] as string

  useEffect(() => {
    // TODO: tạm thời check thử xem dùng obj sẽ ảnh hưởng render ntn
    console.count('🚀🚀 useSocket L9 run')

    // https://socket.io/docs/v4/client-initialization/#from-a-different-domain
    // const socket = initSocket()
    // https://socket.io/how-to/use-with-react#disconnection
    if (payload) {
      socket.auth = {
        Authorization: token
      }
    }

    socket.connect()
    addSocketListen(socket)

    return () => {
      console.count("🚀🚀 useSocket disconnect")
      socket.disconnect()
    }
  }, [token])

  const reConnectSocket = () => socket.connect()
  const disconnectSocket = () => socket.disconnect()

  return {
    socket,
    reConnectSocket,
    disconnectSocket
  }
}
