
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import logluis from './assets/logluis.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img style={{height:"50px", width:"50px"}} src={logluis} alt="Logo" />
        Panel de Control
      </div>
      <div className="user-info">
        <FontAwesomeIcon icon={faUser}/>Usuario Luis Reyes
      </div>
      <button className="menu-toggle">
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
};

export default Navbar;
