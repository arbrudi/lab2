import React, { useState } from 'react';
import '../assets/css/AdminNav.css';

const AdminBar = () => {

  return (
    <div>
    
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

          </ul>
        </div>

    </div>
  );
};

export default AdminBar;
