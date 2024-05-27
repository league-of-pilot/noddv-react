import ChatPanel from '../feature/Chat/ChatPanel/ChatPanel'
import UserPanel from '../feature/Chat/UserPanel/UserPanel'
import { useReceiver } from '../feature/Chat/chatSocket/useReceiver'
import { useSocket } from '../feature/Chat/chatSocket/useSocket'
import { useSocketUser } from '../feature/Chat/chatSocket/useSocketUser'
import styles from './Chat2.module.css'

export default function Chat2() {
  const access_token = localStorage.getItem('access_token')

  const { socket } = useSocket({ Authorization: `Bearer ${access_token}` })
  const { users, setUsers } = useSocketUser(socket)

  const [receiver, selectReceiver] = useReceiver({
    socket,
    users,
    setUsers
  })

  return (
    <div className=''>
      <div className={styles['left-panel']}>
        <UserPanel users={users} selectUser={selectReceiver} />
      </div>
      <div className={styles['right-panel']}>
        <ChatPanel receiver={receiver} />
      </div>
    </div>
  )
}
