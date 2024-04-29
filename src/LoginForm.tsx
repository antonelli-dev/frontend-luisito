import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import logluis from './assets/logluis.png'
import { AuthenticatedUser } from "./dtos/AuthenticatedUser.dto";
import axios from "axios";

interface AusenciasFormProps {
    onSubmit: null;
}

export const LoginForm = ({ onSubmit }: AusenciasFormProps) => {

    const usuario = useRef<HTMLInputElement>(null);
    const claveAcceso = useRef<HTMLInputElement>(null);
    const {setLoggedIn} = useAuth();
    const navigate = useNavigate();
    
    const handleSubmitForm = (e: any) => {
        
        e.preventDefault();
        const user = usuario.current?.value;
        const password = claveAcceso.current?.value;

        axios.post("http://localhost:4000/auth/login", {
            nombre: user,
            password: password
        }).then( response => {

            if( response.status !== 200 ) {
                alert("El nombre de usuario o contraseña no es correcto.");
            }
            
            setLoggedIn(true, response.data);
            navigate('/');


        }).catch( () => alert("El nombre de usuario o contraseña no es correcto.") );
    };

    return (
        <form className="form-container-auth" onSubmit={handleSubmitForm}>

            <h1 style={{textAlign: "center"}}>Inicio de sesión  <img style={{height:"60px", width:"65px", marginLeft:"60px", borderBottomRightRadius:"100%"}} src={logluis} alt="Logo" /></h1>

            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="usuario">Usuario:</label>
                    <input type="text" id="usuario" ref={usuario} style={{width:"100%"}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="claveAcceso">Contraseña:</label>
                    <input type="password" id="claveAcceso" ref={claveAcceso} style={{width:"95%"}}/>
                </div>
                <button type="submit" className="submit-button">Iniciar Sesion</button>
            </div>
        </form>
    );
};