// import styles from './ChatPanel.module.css'

import UserStatus from '../UserPanel/UserStatus'
import styles from './ChatPanel.module.css'
import MessageItem from './MessageItem'

export default function ChatPanel() {
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
          v-model='input'
          placeholder='Your message...'
          className={styles['chat-input']}
        />
        <button className={styles.submit}>Send</button>
      </form>
    </div>
  )
}
