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
import Event from './pages/admin/Event'
import Create_Book from './pages/admin/Book/Create_Book';
import Edit_Books from './pages/admin/Book/Edit_Books'; 
import Create_Event from './pages/admin/Event/Create_Event'
import Edit_Events from './pages/admin/Event/Edit_Events'; 
import Create_Genre from './pages/admin/Book_Genre/Create_Genre';
import Edit_Genre from './pages/admin/Book_Genre/Edit_Genre';

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
          <Route path="/admin/book/create" element={<Create_Book />} /> 
          <Route path="/admin/book/update/:id" element={<Edit_Books />} /> 
          <Route path="/admin/book_genre/create" element={<Create_Genre />} /> 
          <Route path="/admin/book_genre/update/:Book_Genre_ID" element={<Edit_Genre/>} /> 
          <Route path="/admin/comics" element={<Comics />} /> 
          <Route path="/admin/event_books" element={<EventBooks/>} /> 
          <Route path="/admin/event" element={<Event/>} /> 
          <Route path="/admin/event/create" element={<Create_Event />} />  
          <Route path="/admin/event/update/:id" element={<Edit_Events />} /> 
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;