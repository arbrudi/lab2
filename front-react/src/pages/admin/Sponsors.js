import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../../assets/css/Event.css'; 

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("/admin/sponsors"); 
        setSponsors(response.data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchSponsors();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/admin/sponsor/delete/${_id}`);
      setSponsors(sponsors.filter(sponsors => sponsors._id !== _id));
    } catch (error) {
      console.error("Error deleting sponsors:", error);
    }
  };

  return (
    <div className='container'>
      <AdminBar />
      <div>
        <h1 className='list'>Sponsor List</h1>
        <div className='add-link'>
          <Link to={'/admin/sponsors/create'}>Add a new sponsor</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Logo</th> 
              <th>Sponsor Name</th>
              <th>Date joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((spon) => (
              <tr key={spon._id}>
                <td>{spon.Logo}</td>
                <td>{spon.Sponsor_name}</td>
                <td>{spon.Joined_on}</td>
                <td>
                  <Link to={`/admin/sponsors/update/${spon._id}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDelete(spon._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sponsors;