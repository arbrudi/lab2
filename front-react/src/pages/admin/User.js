import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar'
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Books_.css';

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get("/admin/user");
            setUsers(response.data);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
    }, []);

    const handleDelete = async (User_ID) => {
        try {
          await axios.delete(`/admin/user/delete/${User_ID}`);
          setUsers(users.filter(user => user.User_ID !== User_ID));
        } catch (error) {
          console.error("Error deleting user:", error);
        }
    };

    return (
        <div className='container'>
            <AdminBar />
            <div>
                <h1 className='list'>User List</h1>
                <div className='add-link'>
                    <Link to={'/admin/user/create'}>Add User</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>User_ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>User_Role</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.User_ID}> 
                                <td>{user.User_ID}</td>
                                <td>{user.Name}</td>
                                <td>{user.Surname}</td>
                                <td>{user.User_Role}</td>
                                <td>{user.Email}</td>
                                <td>{user.Username}</td>
                                <td>{user.Password}</td>
                                <td>
                                    <Link to={`/admin/user/update/${user.User_ID}`}>
                                        <button className='edit-bttn'>Edit</button>
                                    </Link>
                                    <button className='del-bttn' onClick={() => handleDelete(user.User_ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;
