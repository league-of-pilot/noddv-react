import UserInfo from './UserInfo'
import styles from './UserPanel.module.css'

export default function UserPanel() {
  return (
    <div className={styles['user-panel']}>
      <UserInfo />
      <UserInfo />
      <UserInfo />
    </div>
  )
}
