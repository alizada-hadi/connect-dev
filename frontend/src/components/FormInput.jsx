import React from "react";

const FormInput = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={type}
        className="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};

export default FormInput;
