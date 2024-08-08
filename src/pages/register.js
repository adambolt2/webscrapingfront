import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import video from './blueEarthHero.mp4'; // Make sure to adjust the path


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://adamswebscrapers-hhg8djg9dcd8bqem.ukwest-01.azurewebsites.net/api/Users/fdtjgz8r', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
        }),
      });

      if (response.ok) {
        // Redirect to Verify page with email as state
        navigate('/Verify', { state: { email } });
      } else {
        const result = await response.json();
        console.log(result.message);
        setError(result.message || 'An unexpected error occurred');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="register-container">
      <div className="overlay">
      <video autoPlay loop muted playsInline  className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="register-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="register-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="register-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="register-btn">Register</button>
          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
