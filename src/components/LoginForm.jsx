import React from "react";
import InputBox from "./InputBox";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = ({handleLinkClick}) => {
  return (
    <div className="form-box login">
      <form action="">
        <h1>Login</h1>
        <InputBox
          placeholder={"Username"}
          type={"text"}
          isRequired={true}
          Icon={FaUser}
        />
        <InputBox
          placeholder={"Password"}
          type={"password"}
          isRequired={true}
          Icon={FaLock}
          minLength={8}
        />

        <button type="submit">Login</button>

        <div className="register-link">
          <p>Don't have an account? <span onClick={handleLinkClick}>Sign Up</span></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
