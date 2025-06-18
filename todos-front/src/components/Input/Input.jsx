import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./style.css";

export default function Input({
  typeProp = 'text', 
  placeholder, 
  value, 
  onChange,
  error,
  isDisabled = false,
  name,
  label,
  className
}) {
  const [type, setType] = useState(typeProp);

  const passwordShowToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };


  return (
    <div className={`input-container ${error ? 'error' : ''} ${isDisabled ? 'disabled' : ''}`}>
      {label && <label htmlFor={name}>{label || placeholder}</label>}
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          className={`input${error ? ' error' : ''} ${className ? className : ''}`}
          id={name}
          name={name}
        />
        {typeProp === 'password' && (
          <button 
            type="button" 
            onClick={passwordShowToggle} 
            className="toggle-password"
            aria-label={type === 'password' ? 'Show password' : 'Hide password'}
          >
            {type === 'password' ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}