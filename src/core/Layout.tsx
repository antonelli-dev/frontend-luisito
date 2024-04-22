import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authStore } from "../store/auth.store";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export interface LayoutProps {
    children: ReactNode
}

export interface ICatchError {
    message: string
};

interface HttpBadResponse {
    message: string;
    statusCode: number;
};

export function Layout({ children }: LayoutProps) {
    

    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();


    useEffect( () => {

        if( !isLoggedIn ) {
            navigate("/login");
        }

    });

    useEffect( () => {
        window.addEventListener("onAxiosInterceptError", (e: any) => {
            
            alert("Se ha producido un error: " + e.detail.message)
        });
    }, []);

    return (
        <>
            {children}
        </>
    );
}