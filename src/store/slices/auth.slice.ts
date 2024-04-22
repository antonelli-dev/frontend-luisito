import { StateCreator } from "zustand";

export interface IAuthSlice {
    isLoggedIn: boolean;
    setLoggedIn: (value: boolean) => void
};


export const createAuthSlice: StateCreator<IAuthSlice> = (set) => ({
    isLoggedIn: false,
    setLoggedIn: (value: boolean) => set( (state) => ({ isLoggedIn: value }) )
})