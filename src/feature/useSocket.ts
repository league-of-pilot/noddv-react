import { useEffect } from 'react'
import { addSocketListen, socket } from './socketInit'

// Vì viết dạng singleton nên việc disconnect này sẽ disconnect socket toàn app
// Tuy nhiên nếu connect cũng chỉ connect vào 1 api socket duy nhất

export const useSocket = () => {
  useEffect(() => {
    // https://socket.io/docs/v4/client-initialization/#from-a-different-domain
    // const socket = initSocket()
    // https://socket.io/how-to/use-with-react#disconnection
    socket.connect()
    addSocketListen(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  const reConnectSocket = () => socket.connect()
  const disconnectSocket = () => socket.disconnect()

  return {
    reConnectSocket,
    disconnectSocket
  }
}
