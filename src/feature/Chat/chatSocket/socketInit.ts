import { Socket, io } from 'socket.io-client'

// https://socket.io/how-to/use-with-react#example
// => tips
// Chuyển lại dạng singleton -> cẩn thận ssr
// Thật ra cũng chỉ connect tới 1 socket duy nhất, ko dùng lazy ở đây
export const socket = io(
  import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL,
  {
    // set true thì qua chat2 sẽ tự connect
    autoConnect: false
  }
)

export const addSocketListen = (socket: Socket) => {
  socket.on('connect', () => {
    console.log(`🚀 ~ user ${socket.id} connect`)
  })

  // socket.onAny((event, ...args) => {
  //   console.log('socket debug', event, args)
  // })

  socket.on('disconnect', reason => {
    console.log(`🚀 ~ user ${socket.id} disconnect`)
    console.log(reason)
  })

  socket.on('connect_error', err => {
    console.log('🚀 ~ err:', { err })
  })
}
