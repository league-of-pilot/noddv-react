import ChatPanel from '../feature/Chat/ChatPanel/ChatPanel'
import UserPanel from '../feature/Chat/UserPanel/UserPanel'
import styles from './Chat2.module.css'

export default function Chat2() {
  return (
    <div className=''>
      <div className={styles['left-panel']}>
        <UserPanel />
      </div>
      <div className={styles['right-panel']}>
        <ChatPanel />
      </div>
    </div>
  )
}
