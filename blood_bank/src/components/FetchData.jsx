// src/components/FetchData.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Adjust the import based on your file structure
import { collection, getDocs } from 'firebase/firestore';

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blooddata'));
        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Fetched Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>Blood Group: {item.bloodGroup}</p>
            <p>Blood ID: {item.bloodId}</p>
            <p>Branch Name: {item.branchName}</p>
            <p>Branch District: {item.branchDistrict}</p>
            <p>Entry Date: {item.entryDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
