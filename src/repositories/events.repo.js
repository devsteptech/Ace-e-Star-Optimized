import { get, post } from "@/repositories/http";
import { api } from "@/config/axios";
export function listEventsApi() {
    return get("/api/events", { authMode: "admin" });
}
export function createEventApi(payload) {
    return post("/api/events", payload, { authMode: "admin" });
}
export async function importGuestsApi(eventId, file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await api.post(`/api/events/${eventId}/guests/import`, fd, { authMode: "admin" });
    return res.data;
}
export function getEventCredentialsApi(eventId) {
    return get(`/api/events/${eventId}/credentials`, { authMode: "admin" });
}
export function endEventApi(eventId) {
    return post(`/api/events/${eventId}/end`, undefined, { authMode: "admin" });
}
