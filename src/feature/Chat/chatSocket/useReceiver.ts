import { useState } from 'react'
import { TSocketSession } from './socket.type'

export type TSelectReceiver = (user: TSocketSession) => void

export const useReceiver = (users: TSocketSession[]) => {
  const [receiver, setReceiver] = useState<TSocketSession | undefined>(
    undefined
  )

  const selectReceiver = (userSelect: TSocketSession) => {
    const userExist = users.find(user => userSelect.id === user.id)
    if (!userExist) return
    setReceiver(userExist)
  }

  return [receiver, selectReceiver] as const
}
