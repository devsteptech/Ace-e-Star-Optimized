import { reportsRepo } from "@/repositories/reports.repo";
function normalizeEventsResponse(data) {
    if (Array.isArray(data))
        return data;
    if (Array.isArray(data?.events))
        return data.events;
    if (Array.isArray(data?.data))
        return data.data;
    return [];
}
function isCompleted(status) {
    const s = String(status || "").toLowerCase().trim();
    if (!s)
        return false;
    if (s === "on going")
        return false;
    if (s.includes("on going"))
        return false;
    return true;
}
function toDateStr(ev) {
    const raw = ev.updatedAt || ev.createdAt;
    if (!raw)
        return "-";
    const d = new Date(raw);
    if (Number.isNaN(d.getTime()))
        return "-";
    return d.toLocaleDateString("en-US");
}
export async function fetchReports() {
    const data = await reportsRepo.getEventsIndex();
    const events = normalizeEventsResponse(data);
    const completed = events.filter((e) => isCompleted(e.status));
    return completed.map((e) => ({
        id: String(e.id || e._id || ""),
        name: String(e.name || "Event"),
        template: (e.template || e.templateType || "Other"),
        date: toDateStr(e),
        time: String(e.endTime || e.startTime || "-"),
    }));
}
export async function fetchReportDetail(eventId) {
    return (await reportsRepo.getReportDetail(eventId));
}
