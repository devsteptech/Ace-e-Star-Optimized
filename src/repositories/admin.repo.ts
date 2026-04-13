import { get } from "@/repositories/http";
import type { AdminDashboardResponse } from "@/types/admin";

export function getAdminDashboardApi() {
    return get<AdminDashboardResponse>("/api/admin/dashboard", { authMode: "admin" });
}