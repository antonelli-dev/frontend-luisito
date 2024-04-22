import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    
    const {isLoggedIn} = useAuth();


    const navigate = useNavigate();

    useEffect( () => {

        if( !isLoggedIn ) {
            navigate("/login");
        }

    });

    return (
        <>
            {children}
        </>
    );
}