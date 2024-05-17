import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Events_Details.css'
const EventDetailsPage = () => {
  const { Event_ID } = useParams();
  const [event, setEvent] = useState({}); // Initialize event state with an empty object

  useEffect(() => {
    console.log("Event_ID:", Event_ID); // Check if Event_ID is extracted correctly
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/admin/event/${Event_ID}`);
        console.log("Response:", response.data); // Check if response data is received
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
  
    fetchEventDetails();
  }, [Event_ID]);

  return (
    <div className='container'>
      <div className='event-details-container'>
        {event.Event_image && (
          <img src={event.Event_image} alt="Event" className="event-image-details" />
        )}
        <div className="event-details">
          {event.Event_description && (
            <p className="event-description">{event.Event_description}</p>
          )}
          {event.Event_date && (
            <p className="event-date">{event.Event_date}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;