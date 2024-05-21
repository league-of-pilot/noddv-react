import styles from './UserStatus.module.css'

export default function UserStatus() {
  return (
    <div className={styles['status']}>
      <div>
        <i className={styles.icon}></i>
      </div>
      <div className={styles['status-desc']}>Description</div>
    </div>
  )
}
