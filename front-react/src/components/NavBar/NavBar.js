import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");


    const logoutFunction = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("adminToken");
        setTimeout(() => { navigate("/login", { replace: true }) }, 400);
        setTimeout(() => { window.location.reload() }, 500);
    };

    return (
        <nav className='nav-1'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/comics">Comics</Link></li>
                <li><Link to="/events">Events</Link></li>
                { !userToken && !adminToken && <li><Link to="/login">Login</Link></li> }
                { userToken && <li><Link to="/user/book">Dashboard</Link></li> }
                { adminToken && <li><Link to="/admin/user">Dashboard</Link></li> }
                { (userToken || adminToken) && <li onClick={logoutFunction} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bold' }}>Log out</li> }
            </ul>
        </nav>
    );
};

export default NavBar;
