import { useState } from 'react'
import Input from '../../components/Input/Input'
import './style.css' // Import the CSS file
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { apiRequest } from '../../service/api';


export default function UserDetailsPage() {
  const { userData, setValidUser } = useOutletContext();
  const { username, password } = userData;
  const nav = useNavigate()
  const [user, setUser] = useState({

    username: username,
    password: password,
    email: "",
    full_name:  '',
    phone: '',
    street: '',
    city: '',
    company_name: '',
  });

  const handleChange = (e, field) => {
    
      setUser({
        ...user,
        [field]: e.target.value
      });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const data = await apiRequest({ url: '/users/register', method: 'post', body: user  });
      localStorage.setItem('user', JSON.stringify(data));
      nav('/home')
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  const backToRegister = () => {
    setValidUser(false);
    nav("/register")
  };
  return (
    <div className="user-details-container">
      <button onClick={backToRegister} className='back-btn'> <IoArrowBackOutline /></button>
      <h1 className="user-details-title">User Details</h1>
      
      <form onSubmit={handleSubmit} className="user-details-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="name" 
                placeholder="Enter your full Name" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'full_name')}
                name="fullname"
              />
            </div>
            <div className="input-group">
              <Input 
                label="Phone" 
                placeholder="Enter your phone number" 
                typeProp="tel" 
                onChange={(e) => handleChange(e, 'phone')}
                name="phone"
              />
            </div>
            <div className="input-full">
              <Input 
                label="Email" 
                placeholder="Enter your email" 
                typeProp="tel" 
                onChange={(e) => handleChange(e, 'email')}
                name="email"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="form-section">
          <h2 className="section-title">Address Information</h2>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="Street" 
                placeholder="Enter street name" 
                typeProp="text" 
                onChange={(e) => handleChange(e,  'street')}
                name="street"
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="City" 
                placeholder="Enter city" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'city')}
                name="city"
              />
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="form-section">
          <h2 className="section-title">Company Information</h2>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="Company Name" 
                placeholder="Enter company name" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'company_name')}
                name="company_name"
              />
            </div>
        
          </div>
  
        </div>

        {/* Submit Button */}
        <div className="form-footer">
          <button 
            type="submit" 
            className="submit-button"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}