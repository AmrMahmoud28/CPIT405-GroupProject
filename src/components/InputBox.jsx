import React from "react";

const InputBox = ({ placeholder, type, isRequired, Icon, value, setValue }) => {
  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Icon className="icon" />
    </div>
  );
};

export default InputBox;
