import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from 'axios';
import './css/Books_.css';

const Footballer = () => {
  const [teams, setTeams] = useState([]);
  const [year, setYear] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerT, setPlayerT] = useState([]);
  const [error, setError] = useState('');
  const [team, setTeam] = useState('');
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/player/group_get");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/player/group_members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSearchYear = async () => {
    try {
      const response = await axios.get(`/player/year_display/${year}`);
      setPlayers(response.data);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
      setPlayers([]);
    }
  };

  const handleTeamChange = (e) => {
    setTeam(e.target.value);
  };

  const handleSearchTeam = async () => {
    try {
      const response = await axios.get(`/player/team_name/${team}`);
      setPlayerT(response.data);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
      setPlayerT([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
      setMembers(members.filter(member => member.MemberID !== id));
      navigate("/footballer");
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className="main-body">
      <div className='container'>
        <AdminBar />
        <div className="flex-book-contt">
          <div className="b-list_">
            <h1>Group List</h1>
            <div className='cb_list'>
              <Link to={'/create_footballer'} className="link">Add a member and group</Link>
            </div>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>GroupID</th>
                <th>GroupName</th>
                <th>Description</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.GroupID}>
                  <td>{team.GroupID}</td>
                  <td>{team.GroupName}</td>
                  <td>{team.Description}</td>
                  <td>
                    <Link to={`/edit_footballer/${team.GroupID}`}>
                      <button className='edit-bttn'>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Member List</h1>
          <table className='table'>
              
            <thead>
              <tr>
                <th>MemberID</th>
                <th>Name</th>
                <th>Role</th>
                <th>GroupID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.MemberID}>
                  <td>{member.MemberID}</td>
                  <td>{member.Name}</td>
                  <td>{member.Role}</td>
                  <td>{member.GroupID}</td>
                  <td>
                    <Link to={`/edit_footballer/${member.MemberID}`}>
                      <button className='edit-bttn'>Edit</button>
                    </Link>
                    <button className='del-bttn' onClick={() => handleDelete(member.MemberID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Footballer;
