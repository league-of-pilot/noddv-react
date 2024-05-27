import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  TMessChat,
  TMessChatDto,
  TReceiveMessage,
  TSocketSession
} from './socket.type'
import { Socket } from 'socket.io-client'
import { skEv } from './socket.const'
import axios from 'axios'
import { getAxiosController } from '../../../utils/axiosController'

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

export const useMessage = (receiver_id: string) => {
  const [message, setMessage] = useState<TMessChat[]>([])

  useEffect(() => {
    const { axiosOption, controller } = getAxiosController()
    const paramsOptions = {
      params: {
        limit: 10,
        page: 1
      }
    }

    const getMess = async () => {
      if (receiver_id) {
        const res = await axios.get<TMessChatDto>(
          `/chatHistory/${receiver_id}`,
          {
            ...axiosOption,
            ...paramsOptions
          }
        )
        const mess = res.data.result
        setMessage(mess)
      }
    }

    getMess()

    return () => {
      controller.abort()
    }
  }, [receiver_id])

  return [message, setMessage] as const
}
