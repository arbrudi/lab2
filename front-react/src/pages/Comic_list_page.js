import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages_css/BookList.css'

const Comic_list_page = () =>{

    const [Comic, setComic] = useState([]);

    useEffect(() => {
      const fetchComics = async () => {
        try {
          const response = await axios.get("/admin/comics");
          setComic(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      fetchComics();
    }, []);


    return (
        <div>
            <h1>Explore our library!</h1>
            <div className="book-container">
                {Comic.map((comic )=> (
                  <div className="book" key={comic.Comic_ID}>
                    <div key={comic.Comic_ID}>
                      <div className="book-img">
                        <img src={comic.Comic_image} alt={comic.Comic_title} />
                        </div>
                        <div className="book-title">
                        <h2>{comic.Comic_title}</h2>
                        </div>
                        <div className="book-author">
                        <p>{comic.Comic_type}</p>
                        </div>
                        <div className="read-more-b">
                          <Link to={`/comics/${comic.Comic_ID}`}>
                          <button>Read more</button>
                          </Link>
                          </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comic_list_page;