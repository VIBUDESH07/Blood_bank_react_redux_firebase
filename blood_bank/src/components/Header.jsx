import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="container">
      <div className='Logo'>
        <span>Home</span>
      </div>
       
        <ul  className="navbar">
          
            <Link to="/home">
                <li>Home</li></Link>
          
          
            <Link to="/data"><li>Data</li></Link>
        </ul>
    
      <div className='btn'>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Header;
