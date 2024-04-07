import React from 'react';
import '.././assets/css/AdminNav.css'

const AdminDashboard = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <a href="/admin/books">Books</a>
        </li>
        <li>
          <a href="/admin/comics">Comics</a>
        </li>
        <li>
          <a href="/admin/events">Events</a>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard
;