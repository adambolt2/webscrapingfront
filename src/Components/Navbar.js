import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'; // Import the useAuth hook
import "../Styles/main.css";
import logo from '../Images/logo.webp'; // with import

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    logout(); // Clear user context
    navigate('/'); // Navigate to home
	showNavbar();
  };

  return (
    <header>
      <img src={logo} alt="Adams Webscraper's Logo" className="navbar-logo" />

      <nav ref={navRef}>
        <Link onClick={showNavbar} to="/">Home</Link>
        <Link onClick={showNavbar} to="/Analytics">View Analytics</Link>
        <Link onClick={showNavbar} to="/about-me">About Me</Link>
        {user ? (
          <>
		  	  <Link onClick={handleLogout} to="/">Logout</Link>
			  <Link onClick={showNavbar} to="/my-profile">My Profile</Link>
		  </>
		 // Show Logout if user is logged in
        ) : (
          <Link onClick={showNavbar} to="/Login">Login</Link> // Show Login if user is not logged in
        )}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
