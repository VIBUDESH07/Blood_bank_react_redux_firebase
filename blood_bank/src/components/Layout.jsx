import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Bbdash from './Bbdash';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('login') === 'true';
    const storedUserType = localStorage.getItem('userType');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

    setIsLoggedIn(loggedInStatus);
    setUserType(storedUserType);
    setIsAdmin(storedIsAdmin);

    // Redirect to login if not logged in
    if (!loggedInStatus) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {isLoggedIn && userType === 'blood_bank' && isAdmin ? (
        <Bbdash />
      ) : (
        <>
          <Header />
          {/* Add content here if needed */}
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
