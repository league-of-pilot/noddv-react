import styles from './MessageItem.module.css'

export default function MessageItem() {
  return (
    <div className={styles['message-item']}>
      <div className={styles.sender}>sender</div>
      Content
    </div>
  )
}
