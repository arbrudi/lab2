import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Comics = () => {
    
    const { id } = useParams();
    const [comic, setcomic] = useState({});
    const [formData, setFormData] = useState({
        Comic_image:"",
        Comic_title: "",
        Comic_type: "",

        Comic_Description: ""
    });

    useEffect(() => {
       
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/admin/comics/${id}`);
                setcomic(response.data);
                setFormData({
                    Comic_image:response.data.Comic_image,
                    Comic_title: response.data.Comic_title,
                    Comic_type: response.data.Comic_type,
                    Comic_Description: response.data.Comic_Description,
                    Comics_Author_ID:response.data.Comics_Author_ID
                });
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [id]);

    const [Author_list, setAuthor_list] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get("/admin/Comics_Author");
                setAuthor_list(response.data);
            } catch (error) {
                console.error("Error fetching Authors:", error);
            }
        };
        fetchAuthors();
    }, []);


    const handleAuthorChange = (e) => {
        setFormData({ ...formData, Comics_Author_ID: e.target.value });
    };






    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/comics/update/${id}`, formData);
            window.location.href = "/admin/comics";
        } catch (error) {
            console.error("Error updating Comic:", error);
        }
    };

    return (
        <div className="container_c">
            <h1>Edit Comics</h1>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label>Cover Art:</label>
                    <input type="text" name="Comic_image" value={formData.Comic_image} onChange={handleChange} />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" name="Comic_title" value={formData.Comic_title} onChange={handleChange} />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" name="Comic_type" value={formData.Comic_type} onChange={handleChange} />
                </div>
                           <label>
                    Author:
                    <select
                        name="Comics_Author_ID"
                        value={formData.Comics_Author_ID}
                        onChange={handleAuthorChange}
                        required
                    >
                        <option value="">Select an author</option>
                        {Author_list.map((author) => (
                            <option key={author.Comics_Author_ID} value={author.Comics_Author_ID}>
                                {author.Author_Name}
                            </option>
                        ))}
                    </select>
                </label>


                <div>
                    <label>Description:</label>
                    <textarea name="Comic_Description" value={formData.Comic_Description} onChange={handleChange} />
                </div>
                <button type="submit">Update Comic</button>
            </form>
            <Link to={'/admin/comics'}>Back</Link>
        </div>
    );
};

export default Edit_Comics;