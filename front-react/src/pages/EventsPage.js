import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './pages_css/EventsList.css'; // Assuming this CSS file contains styles for the Event component

const EventsPage = () => {
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

 

 
  return (
    <div className='container'>
     
      <div className='events-list'>
        {events.map((event) => (
          <div key={event.Event_ID} className="event-item">
            <img src={event.Event_image} alt="Event" className="event-image" />
            <div className="event-details">
              <p className="event-description">{event.Event_description}</p>
              <p className="event-date">{event.Event_date}</p>
              <Link to={`/events/${event.Event_ID}`} className="event-link">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;