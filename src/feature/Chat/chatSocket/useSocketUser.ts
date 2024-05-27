// socket.on(skEv.USER_ENTER, (data: TSocketSession[]) => {
//   console.log(data)
//   data.forEach(user => {
//     user.self = user.userID === socket.id
//     initReactiveProperties(user)
//   })
// })

import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { skEv } from './socket.const'
import { TSocketSession } from './socket.type'

const sortUsersWithSelf = (data: TSocketSession[]) => {
  const self = localStorage.getItem('email-ddv') as string

  data.sort((a, b) => {
    if (a.email === self) return -1
    if (b.email === self) return 1
    return a.email < b.email ? -1 : 1
  })

  return self
}

export const useSocketUser = (socket: Socket) => {
  const [users, setUsers] = useState<TSocketSession[]>([])

  useEffect(() => {
    console.count('🚀🚀 useSocketUser L18 run')
    socket.on(skEv.GET_USERS, (data: TSocketSession[]) => {
      // console.log(data)
      // const isFirstConnect = users.every(el => el.email !== self)

      sortUsersWithSelf(data)
      setUsers(data)
    })

    socket.on(skEv.USER_ENTER, (data: TSocketSession) => {
      const existUser = users.find(user => user.id === data.id)
      console.log('🚀 useSocketUser L40-users', { users, data, existUser })
      if (!existUser) {
        const tempUsers = [...users, { ...data, isConnected: true }]
        sortUsersWithSelf(tempUsers)
        setUsers(tempUsers)
      } else {
        const tempUsers = users.map(user =>
          user.id === data.id ? { ...user, isConnected: true } : user
        )
        setUsers(tempUsers)
      }
    })

    socket.on(skEv.USER_LEAVE, (data: string) => {
      const tempUsers = users.map(user =>
        user.id === data ? { ...user, isConnected: false } : user
      )
      console.log('🚀 useSocketUser L57-tempUsers', tempUsers)
      setUsers(tempUsers)
    })

    socket.onAny((...args) => console.log(args))

    return () => {
      console.count('🚀🚀 useSocketUser cleanup')
      // https://socket.io/how-to/use-with-react#cleanup
      // Tạm chấp nhận solution này
      socket.off(skEv.GET_USERS)
      socket.off(skEv.USER_ENTER)
      socket.off(skEv.USER_LEAVE)
    }
  }, [socket, users])

  return {
    users,
    setUsers
  }
}
