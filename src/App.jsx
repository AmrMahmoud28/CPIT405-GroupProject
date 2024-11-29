import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import Nav from "./components/Nav";
import "./app.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/context/AuthContext";
import LoginRedirectionRoute from "./components/LoginRedirectionRoute";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavOnPaths = ["/login"];

  return (
    <>
      <ScrollToTop />
      {!hideNavOnPaths.includes(location.pathname) && <Nav />}
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
      {!hideNavOnPaths.includes(location.pathname) && <Footer />}
    </>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
