import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Events_Details.css';

const EventDetailsPage = () => {
  const { Event_ID } = useParams();
  const [event, setEvent] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/admin/event/${Event_ID}`);
        setEvent(response.data);

        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        if (token && user_id) {
          const enrollmentResponse = await axios.get(`/admin/event_participant/check/${Event_ID}/${user_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setIsEnrolled(enrollmentResponse.data.isEnrolled);
        }
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
      const user_id = localStorage.getItem('user_id');

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
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error registering for event:", error);
      setMessage("Error registering for event");
    }
  };

  const handleUnregister = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');

      if (!token || !user_id) {
        setMessage("Please log in to unregister from the event.");
        return;
      }

      const response = await axios.delete(`/admin/event_participant/delete/${Event_ID}/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
      setIsEnrolled(false);
    } catch (error) {
      console.error("Error unregistering from event:", error);
      setMessage("Error unregistering from event");
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
            {isEnrolled ? (
              <button className="register_event" onClick={handleUnregister}>Unenroll</button>
            ) : (
              <button className="register_event" onClick={handleRegister}>Enroll</button>
            )}
            {message && (
              <p className="events_message">{message}</p>
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
            <div className="event-description-details">
              <p>Description:</p>
              <p>{event.Event_description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;