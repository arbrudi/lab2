import {Link} from 'react-router-dom';
import './Footer_style.css';

const Footer = ()=>{
    return(
        <>
        <div className="foot">
            <div className="foot-1">
                <ul>
                    <li>Contact us!</li>
                    <li>elib@gmail.com</li>
                    <li>+383 49 123 123</li>
                    <li>Prishtine</li>
                </ul>
            </div>
            
            <div className="foot-2">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/comics">Comics</Link></li>
                <li><Link to="/events">Events</Link></li>
            </ul>
            </div>
        </div>
        </>

    )
}

export default Footer;