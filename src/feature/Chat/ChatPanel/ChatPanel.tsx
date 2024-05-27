// import styles from './ChatPanel.module.css'

import { SyntheticEvent, useRef } from 'react'
import UserStatus from '../UserPanel/UserStatus'
import { useSocket } from '../chatSocket/useSocket'
import styles from './ChatPanel.module.css'
import MessageItem from './MessageItem'
import { TMessagePayload, TSocketSession } from '../chatSocket/socket.type'
import { useMessage } from '../chatSocket/useReceiver'

type TChatPanel = {
  receiver: TSocketSession | undefined
}

export default function ChatPanel({ receiver }: TChatPanel) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { socket } = useSocket()
  const [message] = useMessage(receiver?.id || '')

  const submitMes = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!inputRef.current || !inputRef.current.value || !receiver) return

    const payload: TMessagePayload = {
      to: receiver.id,
      content: inputRef.current.value
    }

    socket.emit('send_message', payload)
    console.log('🚀 ChatPanel L29-payload', payload)

    inputRef.current.value = ''
  }

  return receiver ? (
    <div className={styles['chat-panel-layout']}>
      <div className={styles['header']}>
        {receiver.email}
        <UserStatus isConnected={receiver.isConnected} />
      </div>

      <div className={styles['message-section']}>
        {message.map(mess => (
          <MessageItem mess={mess} />
        ))}
      </div>

      <form className={styles['form-chat']}>
        <textarea
          ref={inputRef}
          v-model='input'
          placeholder='Your message...'
          className={styles['chat-input']}
        />
        <button onClick={submitMes} className={styles.submit}>
          Send
        </button>
      </form>
    </div>
  ) : (
    <div>Select users to begin chat</div>
  )
}
