import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"; 
import AboutPage from "./pages/AboutPage"; 
import BooksPage from "./pages/BooksPage"; 
import ComicsPage from "./pages/ComicsPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/NavBar/Footer'; 
import Admin from './pages/AdminDashboard'; 
import Book from './pages/admin/Book' 
import Comics from './pages/admin/Comics' 
import EventBooks from './pages/admin/EventBooks' 
import EventParticipants from './pages/admin/EventParticipants'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
      </div> 
      <NavBar />
      <div className="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/books" element={<BooksPage />} /> 
          <Route path="/comics" element={<ComicsPage />} /> 
          <Route path="/events" element={<EventsPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/admin/book" element={<Book />} /> 
          <Route path="/admin/comics" element={<Comics />} /> 
          <Route path="/admin/event_books" element={<EventBooks/>} /> 
          <Route path="/admin/event_participants" element={<EventParticipants/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;