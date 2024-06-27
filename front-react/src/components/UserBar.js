import React from 'react';
import '../assets/css/UserNav.css';

const UserBar = () => {
  return (
    <div className='userbar-body'>
      <div className="userbar-sidebar">
        <ul>
          <li>
            <a href="/user/book">Book</a>
          </li>
          <li>
            <a href="/user/comics">Comics</a>
          </li>
          <li>
            <a href="/user/event">Event</a>
          </li>
          
    
        </ul>
      </div>
    </div>
  );
};

export default UserBar;
