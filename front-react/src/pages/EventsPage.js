import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";
import './pages_css/EventsList.css'; 

const EventsPage = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const [showEventDropdown, setShowEventDropdown] = useState(false); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/admin/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (query || date) {
      const filtered = events.filter(event =>
        (query ? event.Event_title.toLowerCase().includes(query.toLowerCase()) : true) 
      );
      setFilteredEvents(filtered);
      setSelectedEvent(null);
    } else {
      setFilteredEvents(events);
    }
  }, [query, events]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setShowEventDropdown(inputValue.length > 0); 
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setQuery(event.Event_title); 
    setShowEventDropdown(false);
  };

  const clearFilters = () => {
    setQuery('');
    setFilteredEvents(events);
    setShowEventDropdown(false); 
  };

  const handleReadMore = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className='container'>
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
     
      <button onClick={clearFilters} className="clear-filters-button">Clear </button>
      {error && <p className="error-message">{error}</p>}
      {showEventDropdown && (
        <div className='search-dropdown'>
          {filteredEvents.map(event => (
            <div key={event.Event_ID} className="search-dropdown-item" onClick={() => handleEventClick(event)}>
              {event.Event_title}
            </div>
          ))}
        </div>
      )}
      {query || date ? (
         <div className='event-tile-container'>
        {filteredEvents.map(event => (
          <div key={event.Event_ID} className='event-titlee-container'>
            <p className='event-titlee' onClick={() => handleReadMore(event)}>{event.Event_title}</p>
          </div>
          ))}
        </div>
      ) : (
        <div className='events-list'>
          {events.map(event => (
            <div key={event.Event_ID} className="event-item">
              <img src={event.Event_image} alt="Event" className="event-image" />
              <div className="event-details">
                <p className="event-title">{event.Event_title}</p>
                <p className="event-date">{event.Event_date}</p>
                <Link to={`/eventsdetails/${event.Event_ID}`} className="event-link">
                  <button>Read more</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='events-list'>
        {selectedEvent && (
          <div className="event-item">
            <img src={selectedEvent.Event_image} alt={selectedEvent.Event_title} className="event-image" />
            <div className="event-details">
              <h3 className="event-title">{selectedEvent.Event_title}</h3>
              <p className="event-date">{selectedEvent.Event_date}</p>
              <Link to={`/eventsdetails/${selectedEvent.Event_ID}`} className="event-link">
                <button>Read more</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;