import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"

const OATH_PATH = "/login/oath"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: OATH_PATH,
    element: <Login />
  }
])

export default router
