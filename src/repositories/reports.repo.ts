import { get } from "@/repositories/http";

export const reportsRepo = {
    // raw events response (we normalize in service)
    getEventsIndex() {
        return get<any>("/api/events", { authMode: "admin" });
    },

    // report detail endpoint
    getReportDetail(eventId: string) {
        return get<any>(`/api/reports/${eventId}`, { authMode: "admin" });
    },
};