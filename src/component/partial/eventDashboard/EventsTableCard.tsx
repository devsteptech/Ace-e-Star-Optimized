import { useMemo, useState } from "react";
import EventRow from "./EventRow";
import type { EventItem } from "../../../types/eventTypes";
import EndEventConfirmModal from "./EndEventConfirmModal";
import EventFinishedModal from "./EventFinishedModal";
import type { ReportItem } from "@/types/reportTypes";
import type { ReportMetrics } from "@/utils/reportMetrics";

import ReportPreviewModal from "@/component/partial/reportsDashboard/ReportPreviewModal";

import { downloadReportPdf } from "@/services/reportPdf";
import { fetchReportDetail, ReportAttendanceRow } from "@/services/reportsService";

export default function EventsTableCard({
    events,
    loading,
    onViewAll,
    onShareDetails,
    onEndEvent,
}: {
    events: EventItem[];
    loading: boolean;
    onViewAll: () => void;
    onShareDetails?: (id: string) => void;
    onViewReport?: (id: string) => void;
    onEndEvent?: (id: string) => void;
}) {
    const [endOpen, setEndOpen] = useState(false);
    const [activeEndId, setActiveEndId] = useState<string | null>(null);

    const [finishedOpen, setFinishedOpen] = useState(false);
    const [finishedId, setFinishedId] = useState<string | null>(null);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [activeReportId, setActiveReportId] = useState<string | null>(null);

    const [detailLoading, setDetailLoading] = useState(false);
    const [detailReport, setDetailReport] = useState<ReportItem | null>(null);
    const [detailMetrics, setDetailMetrics] = useState<ReportMetrics | null>(null);
    const [detailAttendance, setDetailAttendance] = useState<ReportAttendanceRow[]>([]);

    const askEnd = (id: string) => {
        setActiveEndId(id);
        setEndOpen(true);
    };

    const closeEnd = () => {
        setEndOpen(false);
        setActiveEndId(null);
    };

    const confirmEnd = () => {
        if (!activeEndId) return;

        const id = activeEndId;

        if (onEndEvent) onEndEvent(id);
        else console.log("End Event:", id);

        setFinishedId(id);
        setFinishedOpen(true);
    };

    const activeFinishedEvent = useMemo(() => {
        if (!finishedId) return null;
        return events.find((e) => e.id === finishedId) ?? null;
    }, [events, finishedId]);

    const openEventReport = async (eventId: string) => {
        setActiveReportId(eventId);
        setPreviewOpen(true);

        setDetailLoading(true);
        setDetailReport(null);
        setDetailMetrics(null);
        setDetailAttendance([]);

        try {
            const d = await fetchReportDetail(eventId);
            setDetailReport(d.report);
            setDetailMetrics(d.metrics);
            setDetailAttendance(Array.isArray(d.attendance) ? d.attendance : []);
        } catch (e: any) {
            // alert(e?.message || "Failed to load report");
        } finally {
            setDetailLoading(false);
        }
    };

    const onDownloadFinishedReport = async () => {
        if (!activeFinishedEvent) return;

        try {
            const d = await fetchReportDetail(activeFinishedEvent.id);
            downloadReportPdf(d.report, d.metrics);
        } catch (e: any) {
            // alert(e?.message || "Failed to download report");
        }
    };

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm">
            <EndEventConfirmModal
                open={endOpen}
                onClose={closeEnd}
                onConfirm={() => {
                    confirmEnd();
                    closeEnd();
                }}
            />

            <EventFinishedModal
                open={finishedOpen}
                onClose={() => {
                    setFinishedOpen(false);
                    setFinishedId(null);
                }}
                eventName={activeFinishedEvent?.name ?? "Event"}
                onDownload={onDownloadFinishedReport}
            />

            <ReportPreviewModal
                open={previewOpen}
                onClose={() => {
                    setPreviewOpen(false);
                    setActiveReportId(null);
                    setDetailLoading(false);
                    setDetailReport(null);
                    setDetailMetrics(null);
                    setDetailAttendance([]);
                }}
                report={detailReport}
                metrics={detailMetrics}
                attendance={detailAttendance}
                loading={detailLoading}
            />

            <div className="px-3 sm:px-4 py-4 sm:py-5 flex items-center justify-between">
                <div className="text-[13px] font-semibold text-[#111827]">Event Name</div>

                <button
                    type="button"
                    onClick={onViewAll}
                    className="cursor-pointer text-[12px] font-semibold text-[#1d4ed8]"
                >
                    View All
                </button>
            </div>

            <div className="px-3 sm:px-4 pb-4 sm:pb-5 overflow-x-auto md:overflow-x-hidden">
                <table className="w-full min-w-[720px] md:min-w-full table-fixed text-left">
                    <colgroup>
                        <col className="w-[27%]" />
                        <col className="w-[8%]" />
                        <col className="w-[10%]" />
                        <col className="w-[9%]" />
                        <col className="w-[8%]" />
                        <col className="w-[11%]" />
                        <col className="w-[8%]" />
                    </colgroup>

                    <thead>
                        <tr className="text-[11px] text-[#6b7280] border-b border-[#f0f0f0] whitespace-nowrap">
                            <th className="py-2.5 sm:py-3 font-semibold"> </th>
                            <th className="py-2.5 sm:py-3 font-semibold">Template</th>
                            <th className="py-2.5 sm:py-3 font-semibold">Start Time</th>
                            <th className="py-2.5 sm:py-3 font-semibold">Status</th>
                            <th className="py-2.5 sm:py-3 font-semibold">End Time</th>
                            <th className="py-2.5 sm:py-3 font-semibold">End Event</th>
                            <th className="py-2.5 sm:py-3 font-semibold text-right"> </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <tr key={i} className="border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap">
                                    <td className="py-3 sm:py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ececec] animate-pulse shrink-0" />
                                            <div className="h-4 w-[200px] bg-[#ececec] rounded animate-pulse" />
                                        </div>
                                    </td>
                                    <td className="py-3 sm:py-4">
                                        <div className="h-4 w-16 bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 sm:py-4">
                                        <div className="h-4 w-20 bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 sm:py-4">
                                        <div className="h-4 w-16 bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 sm:py-4">
                                        <div className="h-4 w-16 bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 sm:py-4">
                                        <div className="h-7 sm:h-8 w-24 bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 sm:py-4 text-right">
                                        <div className="ml-auto h-4 w-16 bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                </tr>
                            ))
                            : events.map((ev) => (
                                <EventRow
                                    key={ev.id}
                                    item={ev}
                                    onEndEvent={askEnd}
                                    onShareDetails={(id) => {
                                        if (onShareDetails) return onShareDetails(id);
                                        console.log("Share Details:", id);
                                    }}
                                    onViewReport={(id) => {
                                        openEventReport(id);
                                    }}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}