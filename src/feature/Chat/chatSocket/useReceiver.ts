import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TMessage, TReceiveMessage, TSocketSession } from './socket.type'
import { Socket } from 'socket.io-client'
import { skEv } from './socket.const'

type TUseReceiver = {
  socket: Socket
  users: TSocketSession[]
  setUsers: Dispatch<SetStateAction<TSocketSession[]>>
}

export const useReceiver = ({ socket, users, setUsers }: TUseReceiver) => {
  const [receiver, setReceiver] = useState<TSocketSession | undefined>(
    undefined
  )
  const receiver_id = receiver?.id || ''

  const selectReceiver = (userSelect: TSocketSession) => {
    const userExist = users.find(user => userSelect.id === user.id)
    if (!userExist) return
    setReceiver(userExist)
    setUsers(prev =>
      prev.map(user =>
        user === userExist
          ? {
              ...user,
              newMess: false
            }
          : user
      )
    )
  }

  useEffect(() => {
    socket.on(skEv.RECEIVE_MESSAGE, (data: TReceiveMessage) => {
      const { from } = data
      if (from !== receiver_id) {
        const tempUsers = users.map(user =>
          user.id === from
            ? {
                ...user,
                newMess: true
              }
            : user
        )
        setUsers(tempUsers)
      }
    })

    return () => {
      socket.off(skEv.RECEIVE_MESSAGE)
    }
  }, [receiver_id, setUsers, socket, users])

  return [receiver, selectReceiver] as const
}

export const useMessage = () => {
  const [message, setMessage] = useState<TMessage[]>([])
  return [message, setMessage] as const
}
