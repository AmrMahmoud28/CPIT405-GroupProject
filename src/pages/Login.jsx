import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

const Login = () => {
  const [action, setAction] = useState("");

  const handleRegisterLinkClick = () => {
    setAction(" active");
  };

  const handleLoginLinkClick = () => {
    setAction("");
  };

  return (
    <div className="loginContainer">
      <Link to="/" className="header headerLogin"><h1>Food App</h1></Link>
      <div className={`formCard${action}`}>
        <LoginForm handleLinkClick={handleRegisterLinkClick} />
        <RegisterForm handleLinkClick={handleLoginLinkClick} />
      </div>
    </div>
  );
};

export default Login;
