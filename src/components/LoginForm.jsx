import React, { useState } from "react";
import InputBox from "./InputBox";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

const LoginForm = ({ handleLinkClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to login");
    }
  }

  return (
    <div className="form-box login">
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <InputBox
          placeholder={"Email"}
          type={"email"}
          isRequired={true}
          Icon={FaEnvelope}
          value={email}
          setValue={setEmail}
        />
        <InputBox
          placeholder={"Password"}
          type={"password"}
          isRequired={true}
          Icon={FaLock}
          minLength={8}
          value={password}
          setValue={setPassword}
        />

        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <span onClick={handleLinkClick}>Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
