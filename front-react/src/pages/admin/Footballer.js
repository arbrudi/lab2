import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Books_.css';

const Footballer = () => {
  const [teams, setTeams] = useState([]);
  const [year, setYear] = useState('');
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/player/team_get"); 
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
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
      setPlayers(response.data);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
      setPlayers([]);
    }
  };

  return (
    <div className="main-body">
      <div className='container'>
        <AdminBar />
        <div className="flex-book-contt">
          <div className="b-list_">
            <h1>Team List</h1>
            <div className='cb_list'>
              <Link to={'/create_footballer'} className="link">Add a footballer and team</Link>
            </div>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.TeamID}>
                  <td>{team.TeamID}</td>
                  <td>{team.Name}</td>
                  <td>
                    <Link to={`/edit_footballer/${team.TeamID}`}>
                      <button className='edit-bttn'>Edit</button>
                    </Link>
                    {/* Uncomment the following line if you add handleDelete back */}
                    {/* <button className='del-bttn' onClick={() => handleDelete(team.TeamID)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container">
            <h1>Player Birth Year Display</h1>
            <div className="input-group">
              <input 
                type="number" 
                value={year} 
                onChange={handleYearChange} 
                placeholder="Enter birth year" 
              />
              <button onClick={handleSearchYear}>Search</button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="player-list">
              {players.map(player => (
                <div key={player.PlayerId} className="player">
                  <p><strong>Name:</strong> {player.Name}</p>
                  <p><strong>Number:</strong> {player.Number}</p>
                  <p><strong>Birth Year:</strong> {player.BirthYear}</p>
                  <p><strong>Team ID:</strong> {player.TeamID}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <h1>Player TEAM Display</h1>
            <div className="input-group">
              <input 
                type="text" 
                value={team} 
                onChange={handleTeamChange} 
                placeholder="Enter team name" 
              />
              <button onClick={handleSearchTeam}>Search</button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="player-list">
              {players.map(player => (
                <div key={player.PlayerId} className="player">
                  <p><strong>Name:</strong> {player.Name}</p>
                  <p><strong>Number:</strong> {player.Number}</p>
                  <p><strong>Birth Year:</strong> {player.BirthYear}</p>
                  <p><strong>Team ID:</strong> {player.TeamID}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footballer;
