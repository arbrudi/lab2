import React, { useState, useEffect } from "react";

const AboutPage = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = `http://localhost:5000/search/events?query=${encodeURIComponent(query)}`;
        if (date) {
          url += `&date=${encodeURIComponent(date)}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Events:', data); // Log fetched events
        setEvents(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching events. Please try again later.');
      }
    };

    fetchEvents();
  }, [query, date]);

  const handleInputChange = (event) => {
    setQuery(event.target.value.trim().toLowerCase());
    setSelectedEvent(null);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const clearFilters = () => {
    setDate('');
    setQuery('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={handleInputChange}
      />
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <button onClick={clearFilters}>Clear Filters</button>
      {error && <p>{error}</p>}
      <ul>
        {events.map(event => (
          <li key={event.Event_ID} onClick={() => handleEventClick(event)}>
            {event.Event_title}
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div>
          <h3>{selectedEvent.Event_title}</h3>
          <p>{selectedEvent.Event_description}</p>
          <p>{selectedEvent.Event_date}</p>
          <img src={selectedEvent.Event_image} alt={selectedEvent.Event_title} />
        </div>
      )}
    </div>
  );
};

export default AboutPage;