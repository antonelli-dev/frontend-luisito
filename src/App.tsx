import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./NavBar";
import ContentSpace from "./ContentSpace";
import AerolineasForm from "./AerolineasForm";
import AusenciasForm from "./AusenciasForm";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faTimes, faPlane, faCalendarTimes, faGraduationCap, faUserTie, faHistory, faBriefcase, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginForm } from "./LoginForm";

const router = createBrowserRouter([
  {
    path: "/aerolineas",
    element: <AerolineasPage />,
  },
  {
    path: "/ausencias",
    element: <AusenciasPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

function SidebarContent() {
  const [isSideBarOpen, setSideBarStatus] = useState(true);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setSideBarStatus(!isSideBarOpen);
  };

  const handleNavigate = (path:any) => {
    navigate(path);
    handleSidebarToggle(); // Close sidebar after navigation
  };

  return (
    <Sidebar
      collapsedWidth="80px"
      collapsed={isSideBarOpen}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          backgroundColor:'rgba(0, 0, 0, 0.5)',
          height:'80%',
          borderRadius: '10px',
          textAlign: 'left',
          marginTop: '40%',
          paddingTop:'2rem'
        },
      }}
    >
      <Menu>
        <MenuItem style={{color:'white', fontWeight:'bold'}} onClick={handleSidebarToggle}><FontAwesomeIcon icon={faTimes}/> {' '}Hide</MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}} onClick={() => handleNavigate("/aerolineas")}><FontAwesomeIcon icon={faPlane}/> Aerolineas</MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}} onClick={() => handleNavigate("/ausencias")}><FontAwesomeIcon icon={faCalendarTimes} /> Ausencias</MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}}> <FontAwesomeIcon icon={faGraduationCap}/>{' '}Capacitaciones </MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}}><FontAwesomeIcon icon={faUserTie} />{' '}Empleados </MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}}><FontAwesomeIcon icon={faHistory} />{' '} Historial Laboral </MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}}><FontAwesomeIcon icon={faBriefcase}/>{' '} Puestos </MenuItem>
        <MenuItem style={{color:'white', fontWeight:'bold'}}><FontAwesomeIcon icon={faUsers} />{' '} Usuarios </MenuItem>
        <MenuItem style={{color:'#d80000', fontWeight:'bold'}}><FontAwesomeIcon icon={faSignOutAlt} style={{color:'#d80000'}}/> Cerrar Sesion </MenuItem>
      </Menu>
    </Sidebar>
  );
}

function HomePage() {
  return (
    <div className="page-container">
      <Navbar />
      <SidebarContent />
      <ContentSpace>
        <AerolineasForm onSubmit={null} />
      </ContentSpace>
    </div>
  );
}

function AerolineasPage() {
  return (
    <div className="page-container">
      <Navbar />
      <SidebarContent />
      <ContentSpace>
        <AerolineasForm onSubmit={null} />
      </ContentSpace>
    </div>
  );
}

function AusenciasPage() {
  return (
    <div className="page-container">
      <Navbar />
      <SidebarContent />
      <ContentSpace>
        <AusenciasForm onSubmit={null} />
      </ContentSpace>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="page-container">

      <div className="ContentSpaceAuth">
        <LoginForm onSubmit={null} />
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
