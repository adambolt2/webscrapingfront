import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Verify.css';
import video from './blueEarthHero.mp4'; // Adjust the path as needed

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verifying, setVerifying] = useState(false); // For handling verification process
  const [requestingCode, setRequestingCode] = useState(false); // For handling code request process
  const [disableRequest, setDisableRequest] = useState(false); // For handling request code button disabling
  const [disableVerify, setDisableVerify] = useState(false); // For handling verify button disabling

  useEffect(() => {
    if (!email) {
      setError('Email is missing. Please register again.');
    }
  }, [email]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setVerifying(true);
    setDisableVerify(true);

    try {
      const response = await fetch('https://adamswebscrapers-hhg8djg9dcd8bqem.ukwest-01.azurewebsites.net/api/Users/verify/fdtjgz8r', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          VerificationCode: verificationCode,
        }),
      });

      if (response.ok) {
        setSuccess('User verified successfully. Navigating to login...');
        setDisableRequest(true);
        setDisableVerify(true);
        setTimeout(() => navigate('/login'), 2000); // Redirect after a brief pause
      } else {
        setError('Incorrect or invalid verification code. Please try again.');
        setVerifying(false);
        setDisableVerify(false);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const handleRequestCode = async () => {
    setRequestingCode(true);
    setDisableRequest(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://adamswebscrapers-hhg8djg9dcd8bqem.ukwest-01.azurewebsites.net/api/Users/request-verification-code/fdtjgz8r', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email }),
      });

      if (response.ok) {
        setSuccess('New verification code has been sent.');
      } else {
        setError('Error sending verification code.');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setRequestingCode(false);
      setDisableRequest(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="overlay">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <form className="verify-form" onSubmit={handleVerify}>
          <h2>Verify Your Email</h2>
          <input
            type="text"
            placeholder="Verification Code"
            className="verify-input"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button
            type="submit"
            className="verify-btn"
            disabled={disableVerify} // Disable if verification process is ongoing
          >
            {verifying ? 'Verifying...' : 'Verify'} {/* Text changes based on verification state */}
          </button>
          <button
            type="button"
            className="request-code-btn"
            onClick={handleRequestCode}
            disabled={disableRequest} // Disable if requesting code process is ongoing
          >
            {requestingCode ? 'Requesting...' : 'Request New Code'} {/* Text changes based on requesting code state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
