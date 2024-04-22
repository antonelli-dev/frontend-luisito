export interface IUserAuth {
    isLoggedIn: boolean,
    setLoggedIn: (val: boolean) => void;
};

export function useAuth(): IUserAuth {
    if( !localStorage.getItem("isLoggedIn") ) {
        localStorage.setItem("isLoggedIn", "false");
    }

    const returnValues: IUserAuth = {
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
        setLoggedIn(val) {
            localStorage.setItem("isLoggedIn", `${val}`);
        },
    };
    return returnValues;
    
};