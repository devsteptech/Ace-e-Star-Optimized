import { getAdminDashboardApi } from "@/repositories/adminDashboard.repo";

export async function fetchDashboard() {
    return getAdminDashboardApi();
}