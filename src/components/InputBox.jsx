import React from "react";

const InputBox = ({ placeholder, type, isRequired, Icon }) => {
  return (
    <div className="input-box">
      <input type={type} placeholder={placeholder} required={isRequired} />
      <Icon className="icon" />
    </div>
  );
};

export default InputBox;
