import React, { useState } from 'react';
import './styles.css';

const Login = () => {
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
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const json = await response.json();
      console.log(response.status);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleForm}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

