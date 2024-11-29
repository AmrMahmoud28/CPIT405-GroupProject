import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import "./app.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/context/AuthContext";
import LoginRedirectionRoute from "./components/LoginRedirectionRoute";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <LoginRedirectionRoute>
                <Login />
              </LoginRedirectionRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
