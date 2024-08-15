// src/components/AddHospital.js
import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddHospital = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [services, setServices] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Create user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      // Add hospital details to Firestore
      await addDoc(collection(db, 'hospitals'), {
        name,
        address,
        phone,
        email,
        contactPerson,
        services,
        website,
        userType: 'hospital' // Set the userType to "hospital"
      });
      await addDoc(collection(db, 'users'), {
        email,
        role: 'hospital' // Set the userType to "hospital"
      });
      setSuccess('Hospital added successfully!');
      // Redirect after successful submission
      navigate('/home'); // Adjust the route as needed
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Add New Hospital</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hospital Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Person:</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Services Offered:</label>
          <input
            type="text"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button type="submit">Add Hospital</button>
      </form>
    </div>
  );
};

export default AddHospital;
