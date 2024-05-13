import {Link} from 'react-router-dom';
import './NavBar.css';
const NavBar = () =>{
    return(
        <nav className='nav-1'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/comics">Comics</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;