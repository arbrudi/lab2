import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminBar';
import axios from 'axios';
import '../../../assets/css/Create.css'; 

const Create_footballer = () => {
    const [formData, setFormData] = useState({
        Name: "",
        Number: "",
        BirthYear: "",
        TeamID: ""
    });

    const handleChangeplayer = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [formTeam, setFormTeam] = useState({
        Name: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChangeTeam = (e) => {
        setFormTeam({ ...formTeam, [e.target.name]: e.target.value });
    };

    const handleSubmitTeam = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/team/add', formTeam);
            alert("Team registered successfully!");
            setFormTeam({ Name: "" });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmitPlayer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/player/add', formData);
            alert("Player registered successfully!");
            navigate('/footballer');
        } catch (error) {
            setError(error.message);
        }
    };

    const [teamList, setTeamList] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get("/player/team_get");
                setTeamList(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);

    const handleSelectTeam = (e) => {
        setFormData({ ...formData, TeamID: e.target.value });
    };

    return (
        <div className="container_c">
            <h1>Add a New Team</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmitTeam}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="Name" 
                        value={formTeam.Name} 
                        onChange={handleChangeTeam} 
                        required 
                    />
                </label>
                <button type="submit">Create TEAM</button>
            </form>

            <h1>Add a New Player</h1>
            <form onSubmit={handleSubmitPlayer}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="Name" 
                        value={formData.Name} 
                        onChange={handleChangeplayer} 
                        required 
                    />
                </label>
                <label>
                    Number:
                    <input 
                        type="number" 
                        name="Number" 
                        value={formData.Number} 
                        onChange={handleChangeplayer} 
                        required 
                    />
                </label>
                <label>
                    Birth Year:
                    <input 
                        type="number" 
                        name="BirthYear" 
                        value={formData.BirthYear} 
                        onChange={handleChangeplayer} 
                        required 
                    />
                </label>
                <label>
                    Team:
                    <select
                        name="TeamID"
                        value={formData.TeamID}
                        onChange={handleSelectTeam}
                        required
                    >
                        <option value="">Select a team</option>
                        {teamList.map((team) => (
                            <option key={team.TeamID} value={team.TeamID}>
                                {team.Name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Create Player</button>
            </form>
        </div>
    );
};

export default Create_footballer;
