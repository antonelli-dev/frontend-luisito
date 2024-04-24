import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { authStore } from "../../../store/auth.store";

interface HttpBadResponse {
    message: string;
    statusCode: number;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response)}]`);

    
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error.response)}]`);

    // const setOnError = authStore( (state) => state.setOnError );
    //  setOnError(true, "prueba")

    console.log("ssss amo")

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