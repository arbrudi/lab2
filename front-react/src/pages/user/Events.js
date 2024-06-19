import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../admin/css/Events_.css'; 

const Events = () => {
  const [events, setEvents] = useState([]);
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

    fetchEvents();
  }, [user_id]);

  const handleDeleteParticipant = async (Event_ID) => {
    try {
      await axios.delete(`/user/event_participant/delete/${user_id}/${Event_ID}`);
      setEvents(events.filter(event => event.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div className='container'>
      <UserBar />
      <div className='flex-book-contt'>
        <div className='b-list_'>
          <h1>Event List</h1>
          <div className='cb_list'>
            <Link to={'/user/event_participant/create'} className='link'>Register</Link>
          </div>
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
                  <Link to={`/user/event_participant/update/${event.Event_ID}/${user_id}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDeleteParticipant(event.Event_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;