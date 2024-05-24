import { TSocketSession } from '../chatSocket/socket.type'
import UserInfo from './UserInfo'
import styles from './UserPanel.module.css'

type TUserPanel = {
  users: TSocketSession[]
}

export default function UserPanel({users}: TUserPanel) {
  return (
    <div className={styles['user-panel']}>
      {users.map((user, index) => (<UserInfo key={user.id} user={user} isMe={index === 0}/>))}
      {/* <UserInfo />
      <UserInfo />
      <UserInfo /> */}
    </div>
  )
}
