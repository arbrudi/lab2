import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create_Comics_Author = () => {
    
    const [formData, setFormData] = useState({
        Comics_Author_ID: 0,
        Comic_ID: "",
        Author_Name: "",
        Publisher: "",
        Author_notes: ""
    });

    const [error, setError] = useState(null);
    const navigate =useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/comics_Author/create', formData);
            navigate('/admin/comics')
            alert("Comics_Author registered successfully!")
        } catch (error) {
            setError(error.message);
        }
    };


return (
    <div>
 

   <div>
           
           <h1>Comics Author</h1>
           {error && <p>{error}</p>}
           <form onSubmit={handleSubmit}>
           <label>
           Comics_Author_ID:
                   <input type="text" name="Comics_Author_ID" value={formData.Comics_Author_ID} onChange={handleChange} />
               </label>
               <label>
                   Comic ID:
                   <input type="text" name="Comic_ID" value={formData.Comic_ID} onChange={handleChange} />
               </label>
               <label>
               Author_Name:
                   <input type="text" name="Author_Name" value={formData.Author_Name} onChange={handleChange} />
               </label>
               <label>
               Publisher:
                   <input type="text" name="Publisher" value={formData.Publisher} onChange={handleChange} />
               </label>

               <label>
               Author_notes:
                   <textarea name="Author_notes" value={formData.Author_notes} onChange={handleChange}></textarea>
               </label>
               <button type="submit">Create Comic_author</button>
           </form>
       </div>



    </div>
)



}

export default Create_Comics_Author;