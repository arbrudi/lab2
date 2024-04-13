import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";

const Event = () => {
  const [events, setEvents] = useState([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/admin/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };


    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/admin/event/delete/${eventId}`);
      setEvents(events.filter(event => event.Event_ID !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }; 


  return (
    <div>
      <AdminBar />
      <div>
        <Link to={'/admin/event/create'}>Add a new event</Link>
      </div>

      <div>
        <h1>Events List</h1>
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.Event_ID}>
                <td>{event.Event_ID}</td>
                <td>{event.Event_description}</td>
                <td>{event.Event_date}</td>
                <td>
                    <Link to={`/admin/event/update/${event.Event_ID}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteEvent(event.Event_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
};

export default Event;