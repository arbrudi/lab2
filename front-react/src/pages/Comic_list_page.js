import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages_css/ComicList.css'; 

const Comic_list_page = () => {
  const [comics, setComics] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorsMap, setAuthorsMap] = useState({});

  useEffect(() => {
      const fetchComics = async () => {
          try {
              const response = await axios.get("/admin/comics");
              setComics(response.data);
          } catch (error) {
              console.error("Error fetching comics:", error);
          }
      };

      fetchComics();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("/admin/Comics_Author");
        const authorsData = response.data;
        setAuthors(authorsData);
        
        const authorsMap = {};
        authorsData.forEach(author => {
          authorsMap[author.Comics_Author_ID] = author.Author_Name;
        });
        setAuthorsMap(authorsMap);

      } catch (error) {
        console.error("Error fetching Authors:", error);
      }
    };
    fetchAuthors();
  }, [comics]);








  return (

    <div>


    <h1 className="h1-comic-list">Explore our library!</h1>
      <div className="comic-box">
          <div className="comic-container">
              {comics.map((comic) => (
                  <div className="comic-item" key={comic.Comic_ID}>
                      <div className="comic">
                          <div className="comic-info">
                              <div className="comic-img">
                                  <img src={comic.Comic_image} alt={comic.Comic_title} />
                              </div>
                              <div className="comic-title">
                                  <h2>{comic.Comic_title}</h2>
                              </div>
                              <div className="comic-Author">
                              <h3>{authorsMap[comic.Comics_Author_ID]}</h3>
                              </div>
                              <div className="comic-type">
                                  <p>{comic.Comic_type}</p>
                              </div>
                              <div className="read-more">

                                  <Link to={`/comics/${comic.Comic_ID}`}>
                                      <button>Read more</button>
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
      </div>
  );
}

export default Comic_list_page;
