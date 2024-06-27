import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Developers_.css'; 

const Developer = () => {
  const [developers, setDevelopers] = useState([]);
  
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get("/admin/Developer"); 
        setDevelopers(response.data);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  const handleDeleteDeveloper = async (_id) => {
    try {
      await axios.delete(`/admin/Developer/delete/${_id}`);
      setDevelopers(developers.filter(developer => developer._id !== _id));
    } catch (error) {
      console.error("Error deleting developer:", error);
    }
  };

  const renderIcon = (icon) => {
    if (icon.length <= 4) {
      return icon; 
    }
    return `${icon.slice(0, 3)}****`;
  };

  return (
    <div className="main-body">
      <div className='container-unique'>
        <AdminBar />
        <div className="flex-book-conttt-unique">
          <div>
            <h1 className='clist-unique'>Developer List</h1>
            <div className='add-link-unique'>
              <Link to={'/admin/Developer/create'} className="add-button-unique">+</Link>
            </div>
            <table className='table-unique'>
              <thead>
                <tr>
                  <th>Icon</th> 
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {developers.map((developer) => (
                  <tr key={developer._id}>
                    <td>{renderIcon(developer.icon)}</td>
                    <td>{developer.name}</td>
                    <td className='truncate'>{developer.description}</td>
                    <td>
                      <Link to={`/admin/Developer/update/${developer._id}`}>
                        <button className='edit-bttn-unique'>Edit</button>
                      </Link>
                      <button className='del-bttn-unique' onClick={() => handleDeleteDeveloper(developer._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
