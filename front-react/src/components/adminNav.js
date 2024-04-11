import React from 'react';
import '../assets/css/AdminNav.css'

const AdminDashboard = () => {
  return (
    <div className="sidebar"> 
      <ul>
        <li>
          <a href="/admin/book">Book</a>
        </li>
        <li>
          <a href="/admin/comics">Comics</a>
        </li>
        <li>
          <a href="/admin/event_participants">Event participants</a>
        </li> 
        <li>
          <a href="/admin/event_books">Event books</a>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard
;