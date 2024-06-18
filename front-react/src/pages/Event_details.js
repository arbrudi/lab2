import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Events_Details.css';

const EventDetailsPage = () => {
  const { Event_ID } = useParams();
  const [event, setEvent] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/admin/event/${Event_ID}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [Event_ID]);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id'); // Retrieve user_id from localStorage

      if (!token || !user_id) {
        setMessage("Please log in to register for the event.");
        return;
      }

      const response = await axios.post('/admin/event_participant/create', {
        Event_ID: Event_ID,
        User_ID: user_id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering for event:", error);
      setMessage("Error registering for event");
    }
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='event-details-container'>
        <div className="event-details">
          {event.Event_image && (
            <img src={event.Event_image} alt="Event" className="event-image-details" />
          )}
          <div className="register_event_container"> 
        
            <button className="register_event" onClick={handleRegister}>Register</button>
            {message && (
              <p className="events_name">{message}</p>
            )}
          </div>
        </div>
        <div className="event-details-column">
          {event.Event_title && (
            <p className="event-title-details">{event.Event_title}</p>
          )}
          {event.Event_date && (
            <p className="event-date-details">Date: {event.Event_date}</p>
          )}
          {event.Event_description && (
             < div className="event-description-details"><p>Description:</p>
             <p>{event.Event_description}</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;