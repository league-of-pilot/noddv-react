// import styles from './ChatPanel.module.css'

import { SyntheticEvent, useRef } from 'react'
import UserStatus from '../UserPanel/UserStatus'
import styles from './ChatPanel.module.css'
import MessageItem from './MessageItem'
import { useSocket } from '../../useSocket'

export default function ChatPanel() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { socket } = useSocket()

  const submitMes = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!inputRef.current || !inputRef.current.value) return

    console.log(inputRef.current.value)
    socket.emit('send_message', inputRef.current.value)
    inputRef.current.value = ''
  }

  return (
    <div className={styles['chat-panel-layout']}>
      <div className={styles['header']}>
        UserName
        <UserStatus />
      </div>

      <div className={styles['message-section']}>
        <MessageItem />
        <MessageItem />
        <MessageItem />
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
  )
}
