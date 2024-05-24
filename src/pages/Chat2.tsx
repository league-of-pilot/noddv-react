import ChatPanel from '../feature/Chat/ChatPanel/ChatPanel'
import UserPanel from '../feature/Chat/UserPanel/UserPanel'
import { useSocket } from '../feature/useSocket'
import styles from './Chat2.module.css'

export default function Chat2() {
  const access_token = localStorage.getItem('access_token')

  useSocket({ Authorization: `Bearer ${access_token}` })

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
