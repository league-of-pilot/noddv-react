import { TSelectReceiver, TSocketSession } from '../chatSocket/socket.type'
import UserInfo from './UserInfo'
import styles from './UserPanel.module.css'

type TUserPanel = {
  users: TSocketSession[]
  selectUser: TSelectReceiver
}

export default function UserPanel({ users, selectUser }: TUserPanel) {
  // const selectReceiver =
  return (
    <div className={styles['user-panel']}>
      {users.map((user, index) => (
        <UserInfo
          key={user.id}
          user={user}
          isMe={index === 0}
          selectUser={selectUser}
        />
      ))}
    </div>
  )
}
