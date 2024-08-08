import React, { useState } from 'react';
import { useAuth } from '../Components/AuthContext'; // Import the useAuth hook
import './MyProfile.css'; // Import CSS for styling

const MyProfile = () => {
  const { user, updateUser } = useAuth(); // Get user data and update function from context

  // Destructure user information from context
  const {
    firstName,
    lastName,
    apiKey,
    indeedSubscribed,
    linkedInSubscribed,
    totalJobsSubscribed,
    email
  } = user;

  const [loading, setLoading] = useState(false); // Track loading state for API requests
  const [error, setError] = useState(''); // Track error state for API requests

  const handleSubscriptionChange = async (subscriptionType, subscribe) => {
    setLoading(true);
    setError('');

    // Prepare the updated subscription data
    const updatedSubscriptions = {
      indeedSubscribed: subscriptionType === 'indeed' ? subscribe : indeedSubscribed,
      linkedInSubscribed: subscriptionType === 'linkedin' ? subscribe : linkedInSubscribed,
      totalJobsSubscribed: subscriptionType === 'totalJobs' ? subscribe : totalJobsSubscribed
    };

    try {
      const response = await fetch(`https://localhost:7270/api/Users/${email}/fdtjgz8r`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          ...updatedSubscriptions
        }),
      });

      if (response.ok) {
        // Update user context with new subscription status
        updateUser({ ...user, ...updatedSubscriptions });
      } else {
        setError('Failed to update subscription.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-details">
          <h1>{firstName} {lastName}</h1>
          <p>API Key: <code>{apiKey}</code></p>
        </div>
      </div>
      <div className="subscriptions">
        <div className="subscription-box">
          <h2>Subscriptions</h2>
          <p>By Subscribing you are giving us permission to send you an email each time the data set is updated (once a week)</p>
          <p>You will also be able to use your subscribed data set with your API key to make calls to fetch data</p>
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading-message">Updating...</div>}
          <div className="subscription-item">
            <h3>Indeed Listings</h3>
            <p>{indeedSubscribed ? 'Subscribed' : 'Not Subscribed'}</p>
            <button onClick={() => handleSubscriptionChange('indeed', !indeedSubscribed)}>
              {indeedSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            {indeedSubscribed && (
              <div className="linkedin-url">
                <h4>Indeed API URL:</h4>
                <p>
                  <code>
                    https://localhost:7270/api/IndeedModels/JobTitle/jobTitle/limit/startRow/apiKey
                  </code>
                </p>
                <p>Replace <code>jobTitle</code>, <code>limit</code>, <code>startRow</code> and <code>apiKey</code> with appropriate values.</p>
              </div>
            )}
          </div>
          <div className="subscription-item">
            <h3>TotalJobs Listings</h3>
            <p>{totalJobsSubscribed ? 'Subscribed' : 'Not Subscribed'}</p>
            <button onClick={() => handleSubscriptionChange('totalJobs', !totalJobsSubscribed)}>
              {totalJobsSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            {totalJobsSubscribed && (
              <div className="linkedin-url">
                <h4>TotalJobs API URL:</h4>
                <p>
                  <code>
                    https://localhost:7270/api/TotalJobsModels/JobTitle/jobTitle/limit/startRow/apiKey
                  </code>
                </p>
                <p>Replace <code>jobTitle</code>, <code>limit</code>, <code>startRow</code> and <code>apiKey</code> with appropriate values.</p>
              </div>
            )}
          </div>
          <div className="subscription-item">
            <h3>LinkedIn</h3>
            <p>{linkedInSubscribed ? 'Subscribed' : 'Not Subscribed'}</p>
            <button onClick={() => handleSubscriptionChange('linkedin', !linkedInSubscribed)}>
              {linkedInSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            {linkedInSubscribed && (
              <div className="linkedin-url">
                <h4>LinkedIn API URL:</h4>
                <p>
                  <code>
                    https://localhost:7270/api/LinkedInModels/JobTitle/jobTitle/limit/startRow/apiKey
                  </code>
                </p>
                <p>Replace <code>jobTitle</code>, <code>limit</code>, <code>startRow</code> and <code>apiKey</code> with appropriate values.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
