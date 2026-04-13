import { post } from "@/repositories/http";
import { api } from "@/config/axios";
export function adminLoginApi(email, password) {
    return post("/api/auth/admin/login", { email, password }, { authMode: "none" });
}
export function eventmanLoginApi(email, password) {
    return post("/api/eventman/login", { email, password }, { authMode: "none" });
}
export async function adminLogoutApi(token) {
    await api.post("/api/auth/admin/logout", undefined, { headers: { Authorization: `Bearer ${token}` }, authMode: "none" });
}
export async function eventmanLogoutApi(token) {
    await api.post("/api/eventman/logout", undefined, { headers: { Authorization: `Bearer ${token}` }, authMode: "none" });
}
