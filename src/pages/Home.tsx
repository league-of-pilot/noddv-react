import { Link } from "react-router-dom";
import "../app/App.css";
import { googleOAuthUrl, useLogout } from "../feature/useAuth";
import VideoPlayer from "../feature/VideoPlayer";

export default function Home() {
  const { isAuthenticated, logout } = useLogout();
  return (
    <>
      <h1>Google OAuth 2.0 demo</h1>
      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>Hello my friend, you are logged in.</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
        <VideoPlayer />
      </p>
    </>
  );
}
