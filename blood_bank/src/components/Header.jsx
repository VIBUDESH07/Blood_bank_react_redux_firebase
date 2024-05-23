import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="container">
      <div className="logo">
        <span>Home</span>
      </div>
      <div className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/data">Data</Link></li>
          <li><Link to="/hospitals">Connected_Hospitals</Link></li>
        </ul>
      </div>
      <div>
        <Link to="/login">
        <button className='btn'>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
