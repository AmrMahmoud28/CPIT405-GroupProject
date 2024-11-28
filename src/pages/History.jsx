import { useAuth } from "../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function History() {
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
    <div>
      <h1>History {user.email}</h1> {/* this is temporary */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
