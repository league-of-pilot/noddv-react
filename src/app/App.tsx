import { RouterProvider } from 'react-router-dom'
import { useAuthProtect } from '../feature/useAuthProtect'
import AuthLogin from '../pages/AuthLogin'
import './App.css'
import { OATH_PATH } from './app.const'
import router from './router'

function App() {
  const state = useAuthProtect()

  // Chưa bọc trong router nên ko dùng useLocation được
  // hack solution - cheat tạm chờ setup router lại đàng hoàng
  // bypass cực kì nguy hiểm -> có react router đón phía sau nhưng vẫn ko nên
  const { pathname } = window.location
  const byPass = pathname.includes(OATH_PATH)

  return (
    <>
      {(() => {
        if (state === 'pending') {
          return <div>Loading...</div>
        }

        if (state === 'isAuth' || byPass) {
          // hackbypass tạm thời chức năng ggoauth
          // if (typeof state === 'string' && state !== 'error') {
          return <RouterProvider router={router} />
        }

        return <AuthLogin />
      })()}
    </>
  )
  // return <AuthLogin />
  // return <RouterProvider router={router} />
}

export default App
