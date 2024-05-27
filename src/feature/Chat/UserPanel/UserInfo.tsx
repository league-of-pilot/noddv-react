import { TSelectReceiver, TSocketSession } from '../chatSocket/socket.type'
import styles from './UserInfo.module.css'
import UserStatus from './UserStatus'

type TUserInfo = {
  user: TSocketSession
  isMe: boolean
  selectUser: TSelectReceiver
}

export default function UserInfo({ user, isMe, selectUser }: TUserInfo) {
  return (
    <div
      className={styles['user-info']}
      onClick={() => {
        selectUser(user)
      }}
    >
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
