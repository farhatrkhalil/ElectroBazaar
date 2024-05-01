import { useState } from 'react';
import './EditProfile.css';

function EditProfile() {
  const [password, setPassword] = useState('');

  const getPasswordStrength = (password) => {
    const strength = password.length >= 8 ? 'Strong' : password.length >= 5 ? 'Medium' : 'Weak';
    return strength;
  };

  const getPasswordColor = (password) => {
    const strength = getPasswordStrength(password);
    switch (strength) {
      case 'Strong':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Weak':
      default:
        return 'red';
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div id="EditProfile">
      <div className='EditProfileWrap'>
        <div className="Options"> 
          <h4>Edit Your Profile</h4>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" placeholder="Enter your first name" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" placeholder="Enter your last name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Enter your email address" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="Enter your address" />
          </div>
        </div>
    
        <div className='Options'>
          <h4>Password Changes</h4>
          <div className="form-group">
            <label htmlFor="newpass">New Password</label>
            <input type="password" id="newpass" placeholder="Enter your new password" onChange={handlePasswordChange} />
          </div>
          <div className="strength-meter" style={{ color: getPasswordColor(password) }}>
            Password Strength: {getPasswordStrength(password)}
          </div>
          <div className="form-group">
            <label htmlFor="confirmpass">Confirm New Password</label>
            <input type="password" id="confirmpass" placeholder="Confirm your new password" />
          </div>
        </div>

        <div className='Options'>
          <h4>Address Book</h4>
          <div className="form-group">
            <label htmlFor="address2">Address</label>
            <input type="text" id="address2" placeholder="Enter your address" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Enter your city" />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" placeholder="Enter your state" />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" placeholder="Enter your street" />
          </div>
        </div>
      </div>
      <a href="" style={{ marginTop: "25px" }}>Save Changes</a>
    </div>
  );
}

export default EditProfile;
