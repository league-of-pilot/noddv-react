// socket.on(skEv.USER_ENTER, (data: TSocketSession[]) => {
//   console.log(data)
//   data.forEach(user => {
//     user.self = user.userID === socket.id
//     initReactiveProperties(user)
//   })
// })

import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { TSocketSession } from './socket.type'
import { skEv } from './socket.const'

export const useSocketUser = (socket: Socket) => {
  const [users, setUsers] = useState<TSocketSession[]>([])

  useEffect(() => {
    socket.on(skEv.USER_ENTER, (data: TSocketSession[]) => {
      console.log(data)
    })
  })
}
