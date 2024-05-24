import ChatPanel from '../feature/Chat/ChatPanel/ChatPanel'
import UserPanel from '../feature/Chat/UserPanel/UserPanel'
import { useSocket } from '../feature/Chat/chatSocket/useSocket'
import { useSocketUser } from '../feature/Chat/chatSocket/useSocketUser'
import styles from './Chat2.module.css'

export default function Chat2() {
  const access_token = localStorage.getItem('access_token')

  const {socket} = useSocket({ Authorization: `Bearer ${access_token}` })
  const {users} = useSocketUser(socket)

  return (
    <div className=''>
      <div className={styles['left-panel']}>
        <UserPanel users={users}/>
      </div>
      <div className={styles['right-panel']}>
        <ChatPanel />
      </div>
    </div>
  )
}
