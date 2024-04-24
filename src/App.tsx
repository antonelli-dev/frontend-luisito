import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./NavBar";
import ContentSpace from "./ContentSpace";
import AerolineasForm from "./views/aerolineas/AerolineasForm";
import AusenciasForm from "./AusenciasForm";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faTimes, faPlane, faCalendarTimes, faGraduationCap, faUserTie, faHistory, faBriefcase, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginForm } from "./LoginForm";
import { Layout } from "./core/Layout";
import { useAuth } from "./hooks/useAuth";

import axios from "axios";
import { setupInterceptorsTo } from "./core/lib/axios/request.interceptor";
import CapacitacionesForm from "./CapacitacionesForm";
import EmpleadosForm from "./EmpleadosForm";
import PuestosForm from "./PuestoForm";
setupInterceptorsTo(axios)

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
  {
    path: "/capacitaciones",
    element: <CapacitacionesPage />
  },
  {
    path: "/empleados",
    element: <EmpleadosPage />
  },
  {
    path: "/puestos",
    element: <PuestosPage />
  },
]);

function SidebarContent() {
  const [isSideBarOpen, setSideBarStatus] = useState(false);
  const navigate = useNavigate();
  const {setLoggedIn} = useAuth();

  const handleSidebarToggle = () => {
    setSideBarStatus(!isSideBarOpen);
  };

  const handleNavigate = (path: any) => {
    navigate(path);
    handleSidebarToggle(); // Close sidebar after navigation
  };

  const logout = () => {
    navigate("/login")
    setLoggedIn(false);
    
  };

  return (
    <Sidebar
      collapsedWidth="80px"
      collapsed={isSideBarOpen}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: '80%',
          borderRadius: '10px',
          textAlign: 'left',
          marginTop: '40%',
          paddingTop: '2rem'
        },
      }}
    >
      <Menu>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleNavigate("/aerolineas")}><FontAwesomeIcon icon={faPlane} /> Aerolineas</MenuItem>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleNavigate("/ausencias")}><FontAwesomeIcon icon={faCalendarTimes} /> Ausencias</MenuItem>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }} onClick={()=> handleNavigate("/capacitaciones")}> <FontAwesomeIcon icon={faGraduationCap} />{' '}Capacitaciones </MenuItem>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }} onClick={()=> handleNavigate("/empleados")}><FontAwesomeIcon icon={faUserTie} />{' '}Empleados </MenuItem>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faHistory} />{' '} Historial Laboral </MenuItem>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }} onClick={()=> handleNavigate("/puestos")}><FontAwesomeIcon icon={faBriefcase} />{' '} Puestos </MenuItem>
        <MenuItem style={{ color: 'white', fontWeight: 'bold' }}><FontAwesomeIcon icon={faUsers} />{' '} Usuarios </MenuItem>
        <MenuItem style={{ color: '#d80000', fontWeight: 'bold' }} onClick={() => logout()}><FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#d80000' }}  /> Cerrar Sesion </MenuItem>
      </Menu>
    </Sidebar>
  );
}

function HomePage() {

  useEffect(() => {

  },)

  return (
    <div className="page-container">
      <Layout>
        <Navbar />
        <SidebarContent />
        <ContentSpace>
          <AerolineasForm onSubmit={null} />
        </ContentSpace>
      </Layout>
    </div>
  );
}

function AerolineasPage() {
  return (
    <div className="page-container">
      <Layout>
        <Navbar />
        <SidebarContent />
        <ContentSpace>
          <AerolineasForm onSubmit={null} />
        </ContentSpace>
      </Layout>
    </div>
  );
}

function EmpleadosPage() {
  return (
    <div className="page-container">
      <Layout>
        <Navbar />
        <SidebarContent />
        <ContentSpace>
          <EmpleadosForm  />
        </ContentSpace>
      </Layout>
    </div>
  );
}

function PuestosPage() {
  return (
    <div className="page-container">
      <Layout>
        <Navbar />
        <SidebarContent />
        <ContentSpace>
          <PuestosForm onSubmit={()=> null} />
        </ContentSpace>
      </Layout>
    </div>
  );
}


function CapacitacionesPage() {
  return (
    <div className="page-container">
      <Layout>
        <Navbar />
        <SidebarContent />
        <ContentSpace>
          <CapacitacionesForm onSubmit={null} />
        </ContentSpace>
      </Layout>
    </div>
  );
}

function AusenciasPage() {
  return (
    <div className="page-container">
      <Layout>
        <Navbar />
        <SidebarContent />
        <ContentSpace>
          <AusenciasForm onSubmit={null} />
        </ContentSpace>
      </Layout>
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
