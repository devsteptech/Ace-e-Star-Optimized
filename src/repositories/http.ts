import type { AxiosRequestConfig } from "axios";
import { api, type AuthMode } from "@/config/axios";

type Cfg = AxiosRequestConfig & { authMode?: AuthMode };

export async function get<T>(url: string, config?: Cfg): Promise<T> {
    const res = await api.get<T>(url, config);
    return res.data;
}

export async function post<T>(url: string, data?: any, config?: Cfg): Promise<T> {
    const res = await api.post<T>(url, data, config);
    return res.data;
}

export async function put<T>(url: string, data?: any, config?: Cfg): Promise<T> {
    const res = await api.put<T>(url, data, config);
    return res.data;
}

export async function del<T>(url: string, config?: Cfg): Promise<T> {
    const res = await api.delete<T>(url, config);
    return res.data;
}