import React, { useState, useEffect } from 'react';
import './login.css';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('blood_bank'); // default user type
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const loggedInStatus = localStorage.getItem('login');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('login', 'true');
      setIsLoggedIn(true);
      if (userType === 'blood_bank') {
        navigate('/bb-dash');
      } else {
        navigate('/hos-data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.setItem('login', 'false');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      handleLogout();
    } else {
      handleLogin(e);
    }
  };

  return (
    <div>
      <h2>{isLoggedIn ? '' : 'Login'}</h2>
      {error && <p className="error">{error}</p>}
      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="blood_bank">Blood Bank</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>
          <button type="submit">{isLoggedIn ? 'Logout' : 'Login'}</button>
        </form>
      )}
    </div>
  );
};

export default Login;
