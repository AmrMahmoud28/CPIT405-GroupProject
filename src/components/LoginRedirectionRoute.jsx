import { Navigate } from 'react-router-dom';
import { useAuth } from "../auth/context/AuthContext"

export default function LoginRedirectionRoute({ children }) {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/" />;
  }
  
  return children;
}