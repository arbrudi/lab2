import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './../../assets/css/Event.css'; 

const Event = () => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
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

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("/admin/event_participant");
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, []);

  const handleDeleteEvent = async (Event_ID) => {
    try {
      await axios.delete(`/admin/event/delete/${Event_ID}`);
      setEvents(events.filter(event => event.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleDeleteParticipant = async (Event_ID) => {
    try {
      await axios.delete(`/admin/event_participant/delete/${Event_ID}`);
      setParticipants(participants.filter(participant => participant.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div className="main-body">
    <div className='container'>
    
    <div>
      <AdminBar />
      <div>
        <h1 className='list'>Events List</h1>
        <div className='add-link'>
          <Link to={'/admin/event/create'}>Add a new event</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Event ID</th> 
              <th>Image</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.Event_ID}>
                <td>{event.Event_ID}</td> 
                <td>{event.Event_image}</td>
                <td>{event.Event_description}</td>
                <td>{event.Event_date}</td>
                <td>
                  <Link to={`/admin/event/update/${event.Event_ID}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDeleteEvent(event.Event_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      </div>
      <div>
        <h1 className='list'>Participant List</h1>
        <div className='add-link'>
          <Link to={'/admin/event_participant/create'}>Add a new Event Participant</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>User ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.Event_ID}>
                <td>{participant.Event_ID}</td>
                <td>{participant.User_ID}</td>
                <td>
                  <Link to={`/admin/event_participant/update/${participant.Event_ID}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDeleteParticipant(participant.Event_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      <div>
       
      </div>
    </div>
    </div>
  );
};

export default Event;