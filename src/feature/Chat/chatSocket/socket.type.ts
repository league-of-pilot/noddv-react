export type TSocketSession = {
  email: string
  id: string
  isConnected: boolean
}

export type TMessagePayload = {
  to: string
  content: string
}

export type TReceiveMessage = {
  from: string
  content: string
}

export type TSelectReceiver = (user: TSocketSession) => void

export type TMessage = {
  from: TSocketSession
  to: TSocketSession
  content: string
}
