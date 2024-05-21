import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import HlsStreaming from '../pages/HlsStreaming'
import ResetPassword from '../pages/ResetPassword'
import VerifyForgotPassword from '../pages/VerifyForgotPassword'
import VerifyEmail from '../pages/VerifyEmail'
import { OATH_PATH } from './app.const'
import Chat from '../pages/Chat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: OATH_PATH,
    element: <Login />
  },
  {
    path: '/hls',
    element: <HlsStreaming />
  },
  // bản chất 3 route bên dưới chỉ là dummy route để gọi fe gọi api khi nhận được mail
  // route logic, ko có ui
  // thực hiện xong chỉ hiện thông báo success hoặc navigate đi
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  {
    path: '/verify-forgot-password',
    element: <VerifyForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/chat',
    element: <Chat />
  }
])

export default router
