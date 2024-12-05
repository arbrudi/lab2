import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminBar';
import axios from 'axios';
import '../../../assets/css/Create.css'; 

const Create_footballer = () => {
    const [formData, setFormData] = useState({
        Name: "",
        Role: "",
        GroupID: "",
    });

    const handleChangeplayer = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [formTeam, setFormTeam] = useState({
        GroupName: "",
        Description:""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChangeTeam = (e) => {
        setFormTeam({ ...formTeam, [e.target.name]: e.target.value });
    };

    const handleSubmitTeam = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/group/add', formTeam);
            alert("Team registered successfully!");
            navigate('/footballer');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmitPlayer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/member/add', formData);
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
                const response = await axios.get("/player/group_get");
                setTeamList(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);

    const handleSelectTeam = (e) => {
        setFormData({ ...formData, GroupID: e.target.value });
    };

    return (
        <div className="container_c">
            <h1>Add a New Group</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmitTeam}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="GroupName" 
                        value={formTeam.GroupName} 
                        onChange={handleChangeTeam} 
                        required 
                    />
                </label>
                <label>
                Description:
                    <input 
                        type="text" 
                        name="Description" 
                        value={formTeam.Description} 
                        onChange={handleChangeTeam} 
                        required 
                    />
                </label>
                <button type="submit">Create Group</button>
            </form>
            <div className="container_c"></div>
            <h1>Add a New Member</h1>
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
                Role:
                    <input 
                        type="text" 
                        name="Role" 
                        value={formData.Role} 
                        onChange={handleChangeplayer} 
                        required 
                    />
                </label>
                <label>
                GroupID:
                    <select
                        name="GroupID"
                        value={formData.GroupID}
                        onChange={handleSelectTeam}
                        required
                    >
                        <option value="">Select a group</option>
                        {teamList.map((team) => (
                            <option key={team.GroupID} value={team.GroupID}>
                                {team.GroupName}
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
