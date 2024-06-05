import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../../assets/css/Event.css'; // Assuming this CSS file contains styles for the Event component

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

 

  const handleDeleteFeature = async (feature_id) => {
    try {
      await axios.delete(`/admin/feature/delete/${feature_id}`);
      setFeatures(features.filter(feature => feature.feature.id !== feature_id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  

  return (
    <div className='container'>
    
    <div>
      <AdminBar />
      <div>
        <h1 className='list'>Events List</h1>
        <div className='add-link'>
          <Link to={'/admin/feature/create'}>Add a new event</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
             
              <th>Image</th> 
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.feature_id}>
                <td>{feature.self.icon}</td>
                <td>{feature.self.name}</td>
                <td>{feature.self.description}</td>
                <td>
                  <Link to={`/admin/feature/update/${feature.feature_id}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDeleteFeature(feature.feature_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      </div>
     
     
    </div>
  );
};

export default Feature;