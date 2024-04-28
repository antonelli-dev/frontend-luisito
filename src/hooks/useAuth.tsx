import { AuthenticatedUser } from "../dtos/AuthenticatedUser.dto";

export interface IUserAuth {
    isLoggedIn: boolean,
    setLoggedIn: (val: boolean, userData: AuthenticatedUser | undefined) => void;
};

export function useAuth(): IUserAuth {
    if( !localStorage.getItem("isLoggedIn") ) {
        localStorage.setItem("isLoggedIn", "false");
    }

    const returnValues: IUserAuth = {
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
        setLoggedIn(val, userData) {

            console.log("userdata ", userData)
            localStorage.setItem("isLoggedIn", `${val}`);

            if( userData !== undefined && userData !== null ) {
                localStorage.setItem("userData", JSON.stringify(userData));
            } else {
                localStorage.removeItem("userData");
            }
        }
            
    };
    return returnValues;
    
};