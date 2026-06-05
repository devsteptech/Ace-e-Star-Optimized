import { get } from "@/repositories/http";

export const reportsRepo = {
    getEventsIndex() {
        return get<any>("/api/events", { authMode: "admin" });
    },

    getReportDetail(eventId: string) {
        return get<any>(`/api/reports/${eventId}`, { authMode: "admin" });
    },
};