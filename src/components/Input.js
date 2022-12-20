import React from "react";

function Input({ type, placeholder, changehandler }) {
  return (
    <input
      className="p-1 m-2"
      type={type}
      placeholder={placeholder}
      onChange={changehandler}
    />
  );
}

export default Input;
