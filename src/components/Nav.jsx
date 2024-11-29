import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      navigate("/");
      await logout();
    } catch {
      console.error("Failed to logout");
    }
  }

  return (
    <div className="header">
      <Link to="/">
      <h1 className="logo">Food App</h1>
      </Link>
      <nav className="buttons">
        {user ? (
          <>
            <Link to="/history">
              <button>History</button>
            </Link>
            <button className="logoutButton" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </nav>
    </div>
  );
};
export default Nav;
