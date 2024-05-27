import { TSocketSession } from '../chatSocket/socket.type'
import styles from './UserInfo.module.css'
import UserStatus from './UserStatus'

type TUserInfo = {
  user: TSocketSession
  isMe: boolean
}

export default function UserInfo({ user, isMe }: TUserInfo) {
  return (
    <div className={styles['user-info']}>
      <div>
        <div>
          {user.email} {isMe && `(me)`}
        </div>
        <UserStatus isConnected={user.isConnected} />
      </div>

      <div className={styles['noti-message']}>!</div>
    </div>
  )
}
