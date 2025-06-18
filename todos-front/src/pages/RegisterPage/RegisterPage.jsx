import { useState } from 'react';
import './style.css';
import Input from '../../components/Input/Input';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../service/api';

export default function RegisterPage() {
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [validUser, setValidUser] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    // Username validation
    if (!formData.username.trim()) {
      tempErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      tempErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    
    // Password validation
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 1) {
      tempErrors.password = 'Password must be at least 1 characters';
      isValid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (validateForm()) {
        setIsLoading(true);
        const data = await apiRequest({ url: `/users/checkIfUserExist?username=${formData.username}`, method: 'get', });
        
        if(data && data?.userFound ) {
          setGeneralError('Username already exists');
        }
        else {
          nav("user-details")
          setValidUser(true);
        }
        setIsLoading(false);
  }
  };

  if(validUser) {
    return (
      <Outlet context={{userData:{username:formData.username, password:formData.password} , setValidUser:setValidUser }} />
    )
  }
  
  
  return (
    <div className="register-container">
      <h1>Create Account</h1>
      {generalError && <div className="error-message">{generalError}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <Input
          name="username"
          label="Username"
          typeProp="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.username}
        />        

        <Input
          name="password"
          label="Password"
          typeProp="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.password}
        />
        
        <Input
          name="confirmPassword"
          label="Confirm Password"
          typeProp="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.confirmPassword}
        />
        
        <button
          type="submit"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <div className="login-link">
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    
    </div>
  );
}
