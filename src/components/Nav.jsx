import { Link } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
const Nav = () => {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      console.error("Failed to logout");
    }
  }

  return (
    <div>
      <nav>
        {user ? (
          <>
            <Link to="/history">
              <button>History</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
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
