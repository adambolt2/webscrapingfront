import React from 'react';
import { Link } from 'react-router-dom';
import './Analytics.css'; // Import a CSS file for styling
import video from './blueEarthHero.mp4'; // Make sure to adjust the path

const Analytics = () => {
  return (
    <div className="analytics-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <div className="box">
          <h2>View Indeed Stats</h2>
          <Link to="/indeed" className="analytics-btn">View</Link>
        </div>
        <div className="box">
          <h2>View LinkedIn Stats</h2>
          <Link to="/linkedin" className="analytics-btn">View</Link>
        </div>
        <div className="box">
          <h2>View TotalJobs Stats</h2>
          <Link to="/totaljobs" className="analytics-btn">View</Link>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
