import styles from './UserStatus.module.css'

type TUserStatus = {
  isConnected: boolean
}

export default function UserStatus({ isConnected }: TUserStatus) {
  return (
    <div className={styles['status']}>
      <div>
        <i
          className={`${styles.icon} ${isConnected ? styles.connected : ''}`}
        ></i>
      </div>
      <div className={styles['status-desc']}>Description</div>
    </div>
  )
}
