import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Comics_Author = () => {

<h1>test</h1>
 
 const { id } = useParams();
 const [comic, setcomic] = useState({});
 const [formData, setFormData] = useState({
    Author_Name:"",
    Comic_ID: "",
    Publisher: "",
    Author_notes: "",
     
 });


 const [Comics, setComics] = useState([]);


 useEffect(() => {
     const fetchComics = async () => {
       try {
         const response = await axios.get("/admin/comics");
         setComics(response.data);
       } catch (error) {
         console.error("Error fetching Comics:", error);
       }
     };
 
     fetchComics();
   }, []);





 useEffect(() => {
    
     const fetchBook = async () => {
         try {
             const response = await axios.get(`/admin/comics_Author/${id}`);
             setcomic(response.data);
             setFormData({
                Author_Name:response.data.Author_Name,
                Publisher: response.data.Publisher,
                Author_notes: response.data.Author_notes,

             });
         } catch (error) {
             console.error("Error fetching book:", error);
         }
     };

     fetchBook();
 }, [id]);

 const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
     e.preventDefault();
     try {
         await axios.put(`/admin/comics_Author/update/${id}`, formData);
         window.location.href = "/admin/comics";
     } catch (error) {
         console.error("Error updating Comic_Author:", error);
     }
 };

 return (
     <div className="container_c">
         <h1>Edit Author</h1>
         <form onSubmit={handleSubmit}>

             <div>
                 <label>Author_Name</label>
                 <input type="text" name="Author_Name" value={formData.Author_Name} onChange={handleChange} />
             </div>
             <div>
                 <label>Publisher:</label>
                 <input type="text" name="Publisher" value={formData.Publisher} onChange={handleChange} />
             </div>


             <label>
                
                Comic ID:
                <select className='form-control' name="Comic_ID" value={formData.Comic_ID} onChange={handleChange}>
                 <option value="">Select Comic ID</option>
                 {Comics.map(comic => (
                  <option key={comic.Comic_ID} value={comic.Comic_ID}>{comic.Comic_title}</option>
                         ))}
                     </select>
                   </label>


             <div>

                 <label>Description:</label>
                 <textarea name="Author_notes" value={formData.Author_notes} onChange={handleChange} />
             </div>
             <button type="submit">Update Comic</button>
         </form>
         <Link to={'/admin/Comic'}>Back</Link>
     </div>
 );

}

export default Edit_Comics_Author;