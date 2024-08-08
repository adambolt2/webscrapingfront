import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext'; // Import the useAuth hook
import './Login.css';
import video from './blueEarthHero.mp4'; // Make sure to adjust the path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(true); // Track email validity
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const { login } = useAuth(); // Get the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    if (!emailValid) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true); // Start loading
    setDisable(true);
    try {
      const response = await fetch(`https://localhost:7270/api/Users/${email}/${password}/fdtjgz8r`, {
        method: 'GET',
      });

      if (response.status === 401) {
        const errorMessage = await response.text(); // Get the response text
        if (errorMessage === "User is not verified.") {
          setDisable(true)
          setLoading(false)
          setError('User is not verified. Please check your email for verification instructions.');
          setTimeout(() => {
            navigate('/verify', { state: { email } });
          }, 2000); // Redirect to verification page after 5 seconds
        } else {
          setError('Invalid email or password');
          setDisable(false);
          setLoading(false); 
        }
      } else if (response.status === 200) {
        const userData = await response.json();
        login(userData); // Store user data in context
        navigate('/');
      } else {
        setError('An unexpected error occurred');
        setDisable(false);
        setLoading(false); // Stop loading
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setDisable(false);
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))} // Validate email on blur
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn" disabled={disable}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
