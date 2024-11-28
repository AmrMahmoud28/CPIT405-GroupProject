import React from 'react'
import InputBox from "./InputBox";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const RegisterForm = ({handleLinkClick}) => {
  return (
    <div className="form-box register">
      <form action="">
        <h1>Sign Up</h1>
        <InputBox
          placeholder={"Username"}
          type={"text"}
          isRequired={true}
          Icon={FaUser}
        />
        <InputBox
          placeholder={"Email"}
          type={"email"}
          isRequired={true}
          Icon={FaEnvelope}
        />
        <InputBox
          placeholder={"Password"}
          type={"password"}
          isRequired={true}
          Icon={FaLock}
          minLength={8}
        />

        <button type="submit">Sign Up</button>

        <div className="register-link">
          <p>Already have an account? <span onClick={handleLinkClick}>Login</span></p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm