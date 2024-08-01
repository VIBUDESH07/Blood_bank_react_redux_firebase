import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Bbnavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="logo">
        <span>Home</span>
      </div>
      <div className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/data">Data</Link></li>
          <li><Link to="/hospitals">Connected Hospitals</Link></li>
          <li><Link to="/add-data">Add Blood Group</Link></li>
          <li><Link to="/add-hospital">Add Hospital</Link></li> {/* Added link to Add Hospital */}
        </ul>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className='log-out-btn'>
            Logout
          </button>
        ) : (
          <Link to="/login" className='btn'>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Bbnavbar;
