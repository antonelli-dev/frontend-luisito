import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { authStore } from "../../../store/auth.store";
import { toast } from "sonner";

interface HttpBadResponse {
    message: string;
    statusCode: number;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    toast.error((error?.response?.data as HttpBadResponse).message);
    // const setOnError = authStore( (state) => state.setOnError );
    //  setOnError(true, "prueba")
    
    // const event = new CustomEvent<HttpBadResponse>("onAxiosInterceptError", {
    //      detail: {
    //          message: (error?.response?.data as HttpBadResponse).message,
    //          statusCode: (error?.response?.data as HttpBadResponse).statusCode,
    //      }
    //  });

    //  window.dispatchEvent(event);
    
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {

    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}