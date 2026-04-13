
import { reportsRepo } from "@/repositories/reports.repo";
import { ReportItem } from "@/types/reportTypes";
import { ReportMetrics } from "@/utils/reportMetrics";

export type ReportAttendanceRow = {
    id: string;
    name: string;
    relation: string;
    checkInTime: string;
    type: string;
    status: string;
};

type EventItemLike = {
    id?: string;
    _id?: string;
    name?: string;
    template?: string;
    templateType?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    createdAt?: string;
    updatedAt?: string;
};

function normalizeEventsResponse(data: any): EventItemLike[] {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.events)) return data.events;
    if (Array.isArray(data?.data)) return data.data;
    return [];
}

function isCompleted(status: any) {
    const s = String(status || "").toLowerCase().trim();
    if (!s) return false;
    if (s === "on going") return false;
    if (s.includes("on going")) return false;
    return true;
}

function toDateStr(ev: EventItemLike) {
    const raw = ev.updatedAt || ev.createdAt;
    if (!raw) return "-";
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-US");
}

export async function fetchReports(): Promise<ReportItem[]> {
    const data = await reportsRepo.getEventsIndex();
    const events = normalizeEventsResponse(data);

    const completed = events.filter((e) => isCompleted(e.status));

    return completed.map((e) => ({
        id: String(e.id || e._id || ""),
        name: String(e.name || "Event"),
        template: (e.template || e.templateType || "Other") as any,
        date: toDateStr(e),
        time: String(e.endTime || e.startTime || "-"),
    }));
}

export async function fetchReportDetail(eventId: string): Promise<{
    report: ReportItem;
    metrics: ReportMetrics;
    attendance: ReportAttendanceRow[];
}> {
    return (await reportsRepo.getReportDetail(eventId)) as any;
}