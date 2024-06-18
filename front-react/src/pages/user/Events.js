import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../admin/css/Events_.css'; // Importing CSS file for styling
const Events = () => {
  const [events, setEvents] = useState([]);
  const user_id = localStorage.getItem('user_id'); // Retrieve user_id from localStorage

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/admin/events/user/${user_id}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user_id]);

  const handleDeleteParticipant = async (Event_ID) => {
    try {
      await axios.delete(`/admin/event_participant/delete/${Event_ID}/${user_id}`);
      setEvents(events.filter(event => event.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div className='container'>
      <UserBar />
      <div className='stepp'>
        <div className='flex-book-conttt'>
          <div className='bg-list_'>
            <h1>Participant List</h1>
            <div className='cb_list_'>
              <Link to={'/admin/event_participant/create'} className='link'>Add a new Event Participant</Link>
            </div>
          </div>
          <table className='table-c'>
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
                    <Link to={`/admin/event_participant/update/${event.Event_ID}`}>
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
    </div>
  );
};

export default Events;