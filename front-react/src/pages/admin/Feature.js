import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../../assets/css/Event.css'; // Assuming this CSS file contains styles for the Features component

const Feature = () => {
  const [features, setFeatures] = useState([]);
  
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get("/admin/features"); 
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  const handleDeleteFeature = async (_id) => {
    try {
      await axios.delete(`/admin/feature/delete/${_id}`);
      // Filter features based on _id
      setFeatures(features.filter(feature => feature._id !== _id));
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <div className='container'>
      <AdminBar />
      <div>
        <h1 className='list'>Features List</h1>
        <div className='add-link'>
          <Link to={'/admin/feature/create'}>Add a new feature</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Icon</th> 
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature._id}>
                <td>{feature.icon}</td>
                <td>{feature.name}</td>
                <td>{feature.description}</td>
                <td>
                  <Link to={`/admin/feature/update/${feature._id}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDeleteFeature(feature._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feature;