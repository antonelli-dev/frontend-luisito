import { StateCreator } from "zustand";

export interface IAuthSlice {
    onError: boolean;
    onErrorMessage: string;
    setOnError: (value: boolean, message: string) => void
};


export const createAuthSlice: StateCreator<IAuthSlice> = (set) => ({
    onError: false,
    onErrorMessage: '',
    setOnError: (value: boolean, message: string) => set( (state) => ({ onError: value, onErrorMessage: message }) )
})