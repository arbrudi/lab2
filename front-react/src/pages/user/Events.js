import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../admin/css/Events_.css'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newName, setNewName] = useState('');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/user/events/user/${user_id}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/admin/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEvents();
    fetchUsers();
  }, [user_id]);

  const handleDeleteParticipant = async (Event_ID) => {
    try {
      await axios.delete(`/user/event_participant/delete/${user_id}/${Event_ID}`);
      setEvents(events.filter(event => event.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewName(user.Name);
  };

  const handleUpdateUserName = async () => {
    if (selectedUser) {
      try {
        await axios.put(`/admin/event_participant/update/${selectedUser.Event_ID}/${selectedUser.User_ID}`, { Name: newName });
        setSelectedUser(null);
        setNewName('');
        alert("User name updated successfully.");
      } catch (error) {
        console.error("Error updating user name:", error);
      }
    }
  };

  return (
    <div className='event-container'>
      <UserBar />
      <div className='flex-book-contt'>
        <div className='b-list_'>
          <h1>Event List</h1>
        </div>
        <table className='table-b'>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.Event_ID}>
                <td>{event.Event_ID}</td>
                <td>{event.Event_title}</td>
                <td>
                  <button className='del-bttn' onClick={() => handleDeleteParticipant(event.Event_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      {selectedUser && (
        <div className='update-form'>
          <h2>Update User Name</h2>
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
          <button onClick={handleUpdateUserName}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Events;