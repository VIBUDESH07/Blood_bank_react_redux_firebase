import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Adjust the import based on your file structure
import { collection, getDocs, getDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';
import './FetchRequests.css';

const Bbdash = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'request'));
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

  const moveToCollectionAndDelete = async (id, targetCollection) => {
    try {
      const requestDocRef = doc(db, 'request', id);
      const docSnapshot = await getDoc(requestDocRef);
      const requestData = docSnapshot.data();

      if (requestData) {
        console.log(`Moving document with ID ${id} to ${targetCollection}`); // Debugging
        // Add document to the target collection
        await setDoc(doc(db, targetCollection, id), requestData);
        // Delete document from the request collection
        await deleteDoc(requestDocRef);
        
        // Update local state to remove the deleted item
        setData(prevData => prevData.filter(item => item.id !== id));
        console.log(`Document with ID ${id} moved to ${targetCollection} and deleted from request`);
      } else {
        console.error(`Document with ID ${id} does not exist in 'request' collection`);
      }
    } catch (err) {
      console.error(`Error moving document to ${targetCollection}: `, err);
    }
  };

  const handleApprove = async (id) => {
    await moveToCollectionAndDelete(id, 'approve');
  };

  const handleNotApprove = async (id) => {
    await moveToCollectionAndDelete(id, 'not approve');
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
    <div>
      <h2>Fetched Requests</h2>
      <input 
        type="text"
        placeholder="Search by blood group, branch name, or district..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Blood ID</th>
            <th>Branch Name</th>
            <th>Branch District</th>
            <th>Entry Date</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Not Approve</th>
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
              <td>{item.status || 'Pending'}</td>
              <td><button onClick={() => handleApprove(item.id)}>Approve</button></td>
              <td><button onClick={() => handleNotApprove(item.id)}>Not Approve</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bbdash;
