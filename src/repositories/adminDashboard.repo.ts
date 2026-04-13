import { get } from "@/repositories/http";
import { DashboardData } from "@/types/dashboardTypes";

export function getAdminDashboardApi() {
    return get<DashboardData>("/api/admin/dashboard", { authMode: "admin" });
}