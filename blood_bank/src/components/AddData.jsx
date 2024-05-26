// src/components/AddData.jsx
import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './addData.css';

const AddData = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [bloodId, setBloodId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [branchDistrict, setBranchDistrict] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await addDoc(collection(db, 'blooddata'), {
        bloodGroup,
        bloodId,
        branchName,
        branchDistrict,
        entryDate,
      });
      setSuccess('Data added successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-data-container">
      <div className="add-data-box">
        <h2>Add Blood Data</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            />
            <label>Blood Group</label>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={bloodId}
              onChange={(e) => setBloodId(e.target.value)}
              required
            />
            <label>Blood ID</label>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
            <label>Branch Name</label>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={branchDistrict}
              onChange={(e) => setBranchDistrict(e.target.value)}
              required
            />
            <label>Branch District</label>
          </div>
          <div className="input-box">
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              required
            />
            <label>Entry Date</label>
          </div>
          <button type="submit" className="submit-btn">Add Data</button>
        </form>
      </div>
    </div>
  );
};

export default AddData;
