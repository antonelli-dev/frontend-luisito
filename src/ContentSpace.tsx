import React, { ReactNode } from "react";
import "./App.css";

const ContentSpace = ({ children }: { children: ReactNode }): JSX.Element => (
    <div className="ContentSpace" style={{ textAlign: "center" }}>
        <h1>FORMULARIO</h1>
        {children}
    </div>
);

export default ContentSpace;
