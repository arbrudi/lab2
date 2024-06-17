import React, { useState } from 'react';
import '../assets/css/AdminNav.css';

const AdminBar = () => {
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
              <a href="/admin/user">Users</a>
            </li>
            <li>
              <a href="/admin/book">Book</a>
            </li>
            <li>
              <a href="/admin/comics">Comics</a>
            </li>
            <li>
              <a href="/admin/event">Event</a>
            </li>
            <li>
              <a href="/admin/event_books">Event books</a>
            </li> 
            <li>
              <a href="/admin/feature">Feature</a>
            </li>
            <li>
              <a href="/admin/sponsors">Sponsors</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminBar;
