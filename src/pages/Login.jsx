import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

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
      <div className={`formCard${action}`}>
        <LoginForm handleLinkClick={handleRegisterLinkClick} />
        <RegisterForm handleLinkClick={handleLoginLinkClick} />
      </div>
    </div>
  );
};

export default Login;
