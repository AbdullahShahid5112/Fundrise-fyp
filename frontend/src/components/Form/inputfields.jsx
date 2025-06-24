import React from 'react';

export const FormInput = ({ label, type = "text", name, value, onChange, placeholder }) => {
  return (
   <div className="mb-4 text-left">
      <label className="block text-sm font-medium mb-1 text-black" htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border px-3 py-2 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export const TextArea = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4 text-left">
      <label className="block text-sm font-medium mb-1 text-black" htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full border px-3 py-2 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export const SelectInput = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-4 text-left">
      <label className="block text-sm font-medium mb-1 text-black" htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};


export const FileUpload = ({ label, name, onChange, accept = "image/*", note }) => {
  return (
    <div className="mb-4 text-left">
      <label className="block text-sm font-medium mb-1 text-black" htmlFor={name}>
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        accept={accept}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
      />
      {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    </div>
  );
};