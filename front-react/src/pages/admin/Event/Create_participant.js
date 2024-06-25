import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/Create.css"; 

const CreateParticipant = () => {
  const [formData, setFormData] = useState({
    Event_ID: "",
    Name: "",
  });
  const [userNames, setUserNames] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserNames();
  }, []);

  const fetchUserNames = async () => {
    try {
      const response = await axios.get("/admin/users");
      setUserNames(response.data.map((user) => user.Name));
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "Name" && value) {
      const selectedUserId = userNames.findIndex((user) => user === value);
      if (selectedUserId !== -1) {
        setUserId(selectedUserId + 1);
      } else {
        setUserId(null);
        setError("User not found");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("Invalid user name");
      return;
    }

    try {
      await axios.post("/admin/event_participants/create", {
        ...formData,
        User_ID: userId,
      });
      navigate("/admin/event");
      alert("Participant registered successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container_c">
      <h1>Add a new Participant</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Event ID:
          <input
            type="text"
            name="Event_ID"
            value={formData.Event_ID}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <select name="Name" value={formData.Name} onChange={handleChange}>
            <option value="">Select a user</option>
            {userNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        {userId && <p>User ID: {userId}</p>}
        <button type="submit">Create Participant</button>
      </form>
    </div>
  );
};

export default CreateParticipant;