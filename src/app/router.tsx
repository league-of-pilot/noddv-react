import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import HlsStreaming from "../pages/HlsStreaming"

const OATH_PATH = "/login/oath"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: OATH_PATH,
    element: <Login />
  },
  {
    path: "/hls",
    element: <HlsStreaming />
  }
])

export default router
