import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "@/config/env";
import { authStorage } from "@/helper/authStorage";
import { notifyError, notifySuccess } from "@/helper/notify";

export type AuthMode = "admin" | "user" | "none";

// Add custom flags on request config
declare module "axios" {
    export interface AxiosRequestConfig {
        authMode?: AuthMode;


        toast?: {
            success?: boolean | string; 
            error?: boolean | string;   
        };

        silent?: boolean; 
    }
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30_000,
});

api.interceptors.request.use((config) => {
    const mode: AuthMode = (config as any).authMode ?? "user";

    const token =
        mode === "admin"
            ? authStorage.getAdminToken()
            : mode === "user"
                ? authStorage.getUserToken()
                : null;

    if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }

    // FormData upload: don't force content-type
    const isFormData =
        typeof FormData !== "undefined" && config.data instanceof FormData;
    if (isFormData && config.headers) {
        delete (config.headers as any)["Content-Type"];
    }

    return config;
});

api.interceptors.response.use(
    (res) => {
        const cfg = res.config as any;

        if (!cfg?.silent && cfg?.toast?.success) {
            const msg =
                typeof cfg.toast.success === "string"
                    ? cfg.toast.success
                    : (res.data?.message || "Success");

            notifySuccess(msg);
        }

        return res;
    },
    (error) => {
        const cfg = (error?.config ?? {}) as any;
        const authMode: AuthMode = cfg.authMode ?? "user";

        const status = error?.response?.status;

        if (status === 401 && authMode !== "none") {
            authStorage.clearAdminToken();
            authStorage.clearUserToken();
            window.location.href = "/WhoYouAre";
            return Promise.reject(error);
        }

        let message = "Request failed";
        if (isAxiosError(error)) {
            message =
                (error.response?.data as any)?.message ||
                error.message ||
                message;
        } else if (error instanceof Error) {
            message = error.message;
        }

        // error toast default ON, can be disabled
        const errorToastSetting = cfg?.toast?.error;
        const shouldToastError =
            !cfg?.silent && (errorToastSetting === undefined ? true : !!errorToastSetting);

        if (shouldToastError) {
            const toastMsg =
                typeof errorToastSetting === "string" ? errorToastSetting : message;
            notifyError(toastMsg);
        }

        return Promise.reject(new Error(message));
    }
);