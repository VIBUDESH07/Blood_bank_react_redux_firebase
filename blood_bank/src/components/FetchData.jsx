import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';
import './FetchData.css';
import Header from './Header';

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blooddata'));
        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(dataArray); // Debugging: Print the fetched data
        setData(dataArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    (item.bloodGroup && item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.branchName && item.branchName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.branchDistrict && item.branchDistrict.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleMakeRequest = async (item) => {
    const { id, ...itemData } = item; // Exclude the id property
    const requestData = { ...itemData, documentId: id, reason };
    try {
      await addDoc(collection(db, 'request'), requestData);
      alert('Request has been made!');
    } catch (err) {
      console.error("Error making request: ", err);
      alert('Failed to make request.');
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#123abc" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header />
      <div>
        <h2>Fetched Data</h2>
        <input 
          type="text"
          placeholder="Search by blood group, branch name, or district..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <input 
          type="text"
          placeholder="Enter reason for request..."
          value={reason}
          onChange={handleReasonChange}
        />
        <table>
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Blood ID</th>
              <th>Branch Name</th>
              <th>Branch District</th>
              <th>Entry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.bloodGroup || 'N/A'}</td>
                <td>{item.bloodId || 'N/A'}</td>
                <td>{item.branchName || 'N/A'}</td>
                <td>{item.branchDistrict || 'N/A'}</td>
                <td>{item.entryDate || 'N/A'}</td>
                <td>
                  <button onClick={() => handleMakeRequest(item)}>Make Request</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchData;
