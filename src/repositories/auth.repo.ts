import { post } from "@/repositories/http";
import { api } from "@/config/axios";
import type { AdminLoginResponse, EventManLoginResponse } from "@/types/auth";

export function adminLoginApi(email: string, password: string) {
    return post<AdminLoginResponse>(
        "/api/auth/admin/login",
        { email, password },
        { authMode: "none" } 
    );
}

export function eventmanLoginApi(email: string, password: string) {
    return post<EventManLoginResponse>(
        "/api/eventman/login",
        { email, password },
        { authMode: "none" }
    );
}

export async function adminLogoutApi(token: string) {
    await api.post(
        "/api/auth/admin/logout",
        undefined,
        { headers: { Authorization: `Bearer ${token}` }, authMode: "none" } as any
    );
}

export async function eventmanLogoutApi(token: string) {
    await api.post(
        "/api/eventman/logout",
        undefined,
        { headers: { Authorization: `Bearer ${token}` }, authMode: "none" } as any
    );
}