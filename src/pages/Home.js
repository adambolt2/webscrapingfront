import React from 'react';
import './Home.css'; // Import a CSS file for styling
import video from './blueEarthHero.mp4'; // Make sure to adjust the path
import { Link } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
const Home = () => {
  const { user } = useAuth(); // Get the user from the context

  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div id='Home'  className="overlay">
        {user && (
          <div className="welcome-message">
            <div className="typewriter-container">
            Welcome {user.firstName} {user.lastName}
            </div>
          </div>
        )}
        <Link to="/analytics" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
