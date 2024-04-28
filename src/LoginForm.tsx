import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
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
                alert("El nombre de usuario o contraseña no es correcto");
            }
            
            setLoggedIn(true, response.data);
            navigate('/');


        }).catch( () => alert("Algo ha salido mal al consultar al servidor.") );
    };

    return (
        <form className="form-container-auth" onSubmit={handleSubmitForm}>

            <h1 style={{textAlign: "center"}}>Inicio de sesión</h1>

            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="usuario">Nombre de usuario:</label>
                    <input type="text" id="usuario" ref={usuario} />
                </div>
                <div className="form-group">
                    <label htmlFor="claveAcceso">Contraseña:</label>
                    <input type="password" id="claveAcceso" ref={claveAcceso} />
                </div>
                <button type="submit" className="submit-button">Enviar</button>
            </div>
        </form>
    );
};