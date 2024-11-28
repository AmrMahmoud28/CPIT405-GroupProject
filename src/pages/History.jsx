import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function History() {
//   const { user, logout } = useAuth();
  const navigate = useNavigate();

//   async function handleLogout() {
//     try {
//       await logout();
//       navigate('/login');
//     } catch {
//       console.error('Failed to logout');
//     }
//   }

  return (
    <div>
      <h1>History</h1> {/* this is temporary */}
    </div>
  );
}