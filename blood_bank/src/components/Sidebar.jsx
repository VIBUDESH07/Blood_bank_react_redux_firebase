import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/approve-details">Approve Details</Link></li>
        <li><Link to="/not-approved-details">Not Approved Details</Link></li>
        <li><Link to="/connected-hospitals">Connected Hospitals</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
