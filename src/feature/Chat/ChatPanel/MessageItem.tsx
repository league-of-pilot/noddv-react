import { TMessChat } from '../chatSocket/socket.type'
import styles from './MessageItem.module.css'

type TMessageItem = {
  mess: TMessChat
}

export default function MessageItem({ mess }: TMessageItem) {
  return (
    <div className={styles['message-item']}>
      <div className={styles.sender}>sender</div>
      {mess.content}
    </div>
  )
}
