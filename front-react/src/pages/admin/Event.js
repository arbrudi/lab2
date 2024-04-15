import React, { useState, useEffect } from "react";
import AdminNav from '../../components/adminNav';
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


  const handleDeleteEvent = async (Event_ID) => {
    try {
      await axios.delete(`/admin/event/delete/${Event_ID}`);
      setEvents(events.filter(event => event.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }; 

  const[participant, setParticipant] = useState([])

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response_participant = await axios.get("/admin/event_participant");
        setParticipant(response_participant.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipant();
  }, []);

  const Delete_Participant = async (Event_ID) => {
    try {
      await axios.delete(`/admin/event_participant/delete/${Event_ID}`);
      setParticipant(participant.filter(participant => participant.Event_ID !== Event_ID));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div>
      <AdminNav />
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

      <div>
        <Link to={'/admin/event_participant/create'}>Add a new Event Participant</Link>
      </div>
      <div>
        <h1>Participant List</h1>
        <table>
          <thead>
            <tr>
              <th>Event_ID</th>
              <th>User_ID</th>
            </tr>
          </thead>
          <tbody>
            {participant.map((participant) => (
              <tr key={participant.Event_ID}> 
              <td>{participant.Event_ID}</td> 
                <td>{participant.User_ID}</td> 
                <td>
                    <Link to={`/admin/event_participant/update/${participant.Event_ID}`}>
                        <button>Edit</button>
                    </Link>
                        <button onClick={()=>Delete_Participant(participant.Event_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      </div>

    
    </div>
  );
};

export default Event;