import React, { useState } from 'react';
import '../assets/css/AdminNav.css';

const UserBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleNavbar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button class= 'bttn'onClick={toggleNavbar}>Control</button>
      {isVisible && (
        <div className="sidebar">
          <ul>

          
            <li>
              <a href="/user/book">Book</a>
            </li>
            <li>
              <a href="/user/comics_rating">Comic Rating</a>
            </li>
            <li>
              <a href="/user/FavoriteComics">FavoriteComics</a>
            </li>

            <li>
              <a href="/user/event">Event</a>
            </li>
            <li>
              <a href="/user/eventbooks">Event books</a>
            </li>


          </ul>
        </div>
      )}
    </div>
  );
};

export default UserBar;
