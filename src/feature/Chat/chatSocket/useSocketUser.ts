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
    console.count("🚀🚀 useSocketUser L18 run")
    socket.on(skEv.USER_ENTER, (data: TSocketSession[]) => {
      // console.log(data)
      const self = localStorage.getItem('email-ddv') as string
      const isFirstConnect = users.every(el => el.email !== self)

      data.sort((a, b) => {
        if (isFirstConnect && a.email === self) return -1
        if (isFirstConnect && b.email === self) return 1
        return a.email < b.email ? -1 : 1
      })

      if (isFirstConnect) {
        setUsers(data)
        return
      }

      const newUsers = data.filter(user => {
        if (user.email === self) return false
        return users.some(el => el.email === user.email)
      })

      if (newUsers.length) {
        console.log("🚀 useSocketUser L41-newUsers", newUsers)
        const users = [...data, ...newUsers]
        // ko hay lắm
        setUsers(users)
      }

      console.log("🚀 ~ newUsers:", newUsers)
    })

    return () => {
      console.count("🚀🚀 useSocketUser cleanup")
      // https://socket.io/how-to/use-with-react#cleanup
      // Tạm chấp nhận solution này
      socket.off(skEv.USER_ENTER)
    }
  }, [])

  return {
    users, setUsers
  }
}
