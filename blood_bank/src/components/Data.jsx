import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';
import './FetchData.css';
import Header from './Header';
import Bbdash from './Bbdash';
import Bbnavbar from '../Blood--bank Navbar/Bbnavbar';  // Import BBnavbar component

const Data = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

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

    // Check localStorage for login status and user type
    const loggedInStatus = localStorage.getItem('login') === 'true';
    const storedUserType = localStorage.getItem('userType');

    setIsLoggedIn(loggedInStatus);
    setUserType(storedUserType);

    // Fetch data if the user is not of type 'blood bank'
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

  // Conditionally render BBnavbar instead of Header if the user is logged in and of type 'blood bank'
  const NavbarComponent = isLoggedIn && userType === 'blood bank' ? Bbnavbar : Header;
  console.log(userType)

  return (
    <>
      <NavbarComponent /><br />
      <div>
        <h2>Blood Details</h2>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Data;
