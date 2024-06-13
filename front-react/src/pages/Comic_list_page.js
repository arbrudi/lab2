import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages_css/ComicList.css'; 

const Comic_list_page = () => {
  const [comics, setComics] = useState([]);

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
                              <div className="comic-type">
                                  <p>{comic.Comic_type}</p>
                              </div>
                              <div className="read-more">

                                  <Link to={`/comics/${comic.Comic_ID}`}>
                                      <button>Read more</button>
                                  </Link>
                              </div>

                            <div className="Add-FavoriteComics">
                            <button type="submit">FavoriteComic</button>

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
