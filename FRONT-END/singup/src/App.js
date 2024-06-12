import React, { useState } from 'react';
import './App.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleFormEdit = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const json = await response.json();
      console.log('Token:', json.token);
      localStorage.setItem('authToken', json.token);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleForm}>
        <h2>Signup</h2>
        <div className="input-group">
          <input 
            type="email" required value={formData.email}
            onChange={(e) => handleFormEdit(e, 'email')}
          />
          <label>Email</label>
        </div>
        <div className="input-group">
          <input 
            type="password" required value={formData.password}
            onChange={(e) => handleFormEdit(e, 'password')}
          />
          <label>Password</label>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;