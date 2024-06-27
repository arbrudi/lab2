import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Create_participant from './pages/admin/Event/Create_participant' 
import Edit_participant from './pages//admin/Event/Edit_participant'; 
import Create_Comics from './pages/admin/Comics/Create_Comics';
import Edit_Comics from './pages/admin/Comics/Edit_Comics';
import Edit_Comics_Author from './pages/admin/Comics_Author/Edit_Comics_Author';
import Create_Comics_Author from './pages/admin/Comics_Author/Create_Comics_Author';
import EventDetailsPage from './pages/Event_details';
import Create_Genre from './pages/admin/Book_Genre/Create_Genre';
import Edit_Genre from './pages/admin/Book_Genre/Edit_Genre';
import Book_list_page from './pages/Book_list_page';
import Comic_list_page from './pages/Comic_list_page';
import User from './pages/admin/User';
import Create_User from './pages/admin/User/Create_User';
import Edit_User from './pages/admin/User/Edit_User';
import Books from './pages/user/Book'; 
import Comic from './pages/user/Comics' 
import Events from './pages/user/Events'; 
import EventBook from './pages/user/EventBook'; 
import UserDashboard from './pages/UserDashboard';

import Feature from './pages/admin/Feature' 
import Edit_Feature from './pages/admin/Feature/Edit_feature'; 
import Create_Feature from './pages/admin/Feature/Create_feature'

import Sponsors from './pages/admin/Sponsors';
import Create_Sponsor from './pages/admin/Sponsors/Create_Sponsor';
import Edit_Sponsor from './pages/admin/Sponsors/Edit_Sponsor';

import Developer from './pages/admin/Developer';
import Create_Developer from './pages/admin/Developers/Create_Developer';
import Edit_Developer from './pages/admin/Developers/Edit_Developer';
import Footballer from './pages/admin/Footballer';
import Create_footballer from './pages/admin/Footballer/Create_footballer';
import Edit_footballer from './pages/admin/Footballer/Edit_footballer';


function App() {

  const user = localStorage.getItem("userToken");
  const admin = localStorage.getItem("adminToken");

  console.log(user,"client")
  console.log(admin ,"admin")

  return (
    <BrowserRouter>
  
      {(user || admin) &&
      <NavBar />
      }
      <div className="page-body">
        <Routes>
        {user || admin == null &&
           <>
           <Route index element={<AboutPage />} />
           <Route path="/login" element={<LoginPage />} /> 
           <Route path="/register" element={<RegisterPage />} />               
           </> 
          }
       {user &&
          <>
          <Route path="/" element={<AboutPage />} /> 
          <Route path="/events" element={<EventsPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/book/:id" element={<BooksPage />} /> 
          <Route path="/books" element={<Book_list_page />} /> 
          <Route path="/comics/:id" element={<ComicsPage />} /> 
          <Route path="/comics" element={<Comic_list_page/>} /> 
          <Route path="/admin/event_books" element={<EventBooks/>} /> 
          <Route path="/admin/event" element={<Event/>} />  
          <Route path="/eventsdetails/:Event_ID" element={<EventDetailsPage />} /> 
          <Route path="/UserDashboard" element={<UserDashboard />} /> 
          <Route path="/user/book" element={<Books />} /> 
          <Route path="/user/comics" element={<Comic />} /> 
          <Route path="/user/event" element={<Events />} />  
          <Route path="/user/eventbooks" element={<EventBook />} /> 
          </>
          }

        {admin &&
           <>
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/eventsdetails/:Event_ID" element={<EventDetailsPage />} /> 
          <Route path="/" element={<AboutPage />} /> 
          <Route path="/events" element={<EventsPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/footballer" element={<Footballer />} />
          <Route path='/create_footballer' element={<Create_footballer />} />
          <Route path='/edit_footballer/:id' element={<Edit_footballer />} />

          {/* Users */}
      
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/user/create" element={<Create_User />} /> 
          <Route path="/admin/user/update/:User_ID" element={<Edit_User />} />

          {/* BOOKS */}
          <Route path="/book/:id" element={<BooksPage />} /> 
          <Route path="/books" element={<Book_list_page />} /> 
          <Route path="/admin/book" element={<Book />} /> 
          <Route path="/admin/book/create" element={<Create_Book />} /> 
          <Route path="/admin/book/update/:id" element={<Edit_Books />} /> 
          <Route path="/admin/book_genre/create" element={<Create_Genre />} /> 
          <Route path="/admin/book_genre/update/:Book_Genre_ID" element={<Edit_Genre/>} /> 
 
          {/* COMICS */} 
          <Route path="/comics/:id" element={<ComicsPage />} /> 
          <Route path="/comics" element={<Comic_list_page/>} /> 
          <Route path="/admin/comics" element={<Comics />} /> 
          <Route path="/admin/comics/create" element={<Create_Comics />} /> 
          <Route path="/admin/comics/update/:id" element={<Edit_Comics />} /> 
          <Route path="/admin/comics_Author/create" element={<Create_Comics_Author />} />
          <Route path="/admin/comics_Author/update/:id" element={<Edit_Comics_Author />} /> 

          {/* EVENTS */}
          <Route path="/admin/event_books" element={<EventBooks/>} /> 
          <Route path="/admin/event" element={<Event/>} /> 
          <Route path="/admin/event/create" element={<Create_Event />} />  
          <Route path="/admin/event/update/:id" element={<Edit_Events />} /> 
          <Route path="/admin/event_participant/create" element={<Create_participant />} /> 
          <Route path="/admin/event_participant/update/:Event_ID" element={<Edit_participant />} />   

          {/* Features */}
          <Route path="/admin/feature" element={<Feature/>} /> 
          <Route path="/admin/feature/create" element={<Create_Feature />} />  
          <Route path="/admin/feature/update/:id" element={<Edit_Feature />} /> 

          {/* Sponsors */}
          <Route path="/admin/sponsors" element={<Sponsors/>} /> 
          <Route path="/admin/sponsors/create" element={<Create_Sponsor/>} /> 
          <Route path="/admin/sponsors/update/:id" element={<Edit_Sponsor/>} /> 

          {/* Developer */}
          <Route path="/admin/Developer" element={<Developer/>} /> 
          <Route path="/admin/Developer/create" element={<Create_Developer />} />  
          <Route path="/admin/Developer/update/:id" element={<Edit_Developer />} /> 

          </>
           }
        </Routes>
      </div>
      {(user || admin) &&
      <Footer />
}
    </BrowserRouter>
  );
}

export default App;













