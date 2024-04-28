
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import logluis from './assets/logluis.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { AuthenticatedUser } from "./dtos/AuthenticatedUser.dto";

const Navbar = () => {

  const [ userData, setUserData ] = useState<AuthenticatedUser | undefined>();

  useEffect( () => {

    const data = localStorage.getItem("userData");
    
    if( data !== undefined ) {
      setUserData(JSON.parse(data!));
    }

  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <img style={{height:"50px", width:"50px"}} src={logluis} alt="Logo" />
        Panel de Control
      </div>
      <div className="user-info">
        <FontAwesomeIcon icon={faUser}/>Usuario {userData?.nombre}
      </div>
      <button className="menu-toggle">
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
};

export default Navbar;
