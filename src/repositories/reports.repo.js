import { get } from "@/repositories/http";
export const reportsRepo = {
    // raw events response (we normalize in service)
    getEventsIndex() {
        return get("/api/events", { authMode: "admin" });
    },
    // report detail endpoint
    getReportDetail(eventId) {
        return get(`/api/reports/${eventId}`, { authMode: "admin" });
    },
};
