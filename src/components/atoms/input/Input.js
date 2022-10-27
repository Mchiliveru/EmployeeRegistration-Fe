import React from "react";

const Input = ({ id, type, name, additionalClasses, handleChange, isError, ...props}) => {
  return (
    <input
      id={id}
      type={type}
      required
      name={name}
      onChange = {handleChange}
      {...props}
      className={`${isError ? 'border border-red-600' : 'border border-gray-300'} ${additionalClasses} block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none sm:text-sm`}
    />
  );
};

// eslint-disable-next-line react/no-typos
Input.defaultprops = {
  type: "text",
};

export default Input;
