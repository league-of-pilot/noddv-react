import styles from './UserInfo.module.css'
import UserStatus from './UserStatus'

export default function UserInfo() {
  return (
    <div className={styles['user-info']}>
      <div>
        <div>Username</div>
        <UserStatus />
      </div>

      <div className={styles['noti-message']}>!</div>
    </div>
  )
}
