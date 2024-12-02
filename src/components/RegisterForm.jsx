import React, { useState } from 'react'
import InputBox from "./InputBox";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

const RegisterForm = ({ handleLinkClick }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup( email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to signup");
    }
  }

  return (
    <div className="form-box register">
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <InputBox
          placeholder={"Username"}
          type={"text"}
          isRequired={true}
          Icon={FaUser}
          value={username}
          setValue={setUsername}
        />
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

        <button type="submit">Sign Up</button>

        <div className="register-link">
          <p>
            Already have an account?{" "}
            <span onClick={handleLinkClick}>Login</span>
            </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm