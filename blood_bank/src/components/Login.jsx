import React, { useState, useEffect } from 'react';
import './login.css';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('login') === 'true';
    const storedRole = localStorage.getItem('role');
    if (loggedInStatus && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('login', 'true');
      setIsLoggedIn(true);

      // Query Firestore for the document where the email matches the user's email
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRole = userDoc.data().role;
        setRole(userRole);
        localStorage.setItem('userType', userRole);  // Save the role in localStorage
        console.log('User role:', userRole);
        // Perform any role-based navigation or logic here
      } else {
        console.log('No such user document!');
      }
      if(role ==='blood bank'){
      navigate('/bb-dash');
      }
      else{
        navigate('/hos-data')
      } // Adjust the navigation based on your needs
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.setItem('login', 'false');
      localStorage.removeItem('userType');  // Remove the role from localStorage
      setIsLoggedIn(false);
      setRole('');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={isLoggedIn ? handleLogout : handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLoggedIn ? 'Logout' : 'Login'}</button>
        <button type="button" onClick={() => navigate('/')} className='go-home-btn'>
          Go to Home
        </button>
      </form>
    </div>
  );
};

export default Login;
