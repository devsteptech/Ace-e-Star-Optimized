import { get } from "@/repositories/http";
export function getAdminDashboardApi() {
    return get("/api/admin/dashboard", { authMode: "admin" });
}
