import React, { ReactNode } from "react";
import "./App.css";

const ContentSpace = ({ children }: { children: ReactNode }): JSX.Element => (
    <div className="ContentSpace" style={{ textAlign: "center" }}>
     <br/>
        {children}
    </div>
);

export default ContentSpace;
