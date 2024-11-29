import { useAuth } from "../auth/context/AuthContext";

export default function History() {
  const { user } = useAuth();
  return (
    <div>
      <h1>History {user.email}</h1> {/* this is temporary */}
    </div>
  );
}
