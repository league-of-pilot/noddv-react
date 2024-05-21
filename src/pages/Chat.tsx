import { useSocket } from '../feature/useSocket'

export default function Chat() {
  const { disconnectSocket, reConnectSocket } = useSocket()

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <button onClick={reConnectSocket}>Connect</button>
        <button onClick={disconnectSocket}>Disconnect</button>
      </div>
    </div>
  )
}
