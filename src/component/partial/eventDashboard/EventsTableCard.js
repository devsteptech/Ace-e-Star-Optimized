import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import EventRow from "./EventRow";
import EndEventConfirmModal from "./EndEventConfirmModal";
import EventFinishedModal from "./EventFinishedModal";
import ReportPreviewModal from "@/component/partial/reportsDashboard/ReportPreviewModal";
import { downloadReportPdf } from "@/services/reportPdf";
import { fetchReportDetail } from "@/services/reportsService";
export default function EventsTableCard({ events, loading, onViewAll, onShareDetails, onEndEvent, }) {
    const [endOpen, setEndOpen] = useState(false);
    const [activeEndId, setActiveEndId] = useState(null);
    const [finishedOpen, setFinishedOpen] = useState(false);
    const [finishedId, setFinishedId] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [activeReportId, setActiveReportId] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailReport, setDetailReport] = useState(null);
    const [detailMetrics, setDetailMetrics] = useState(null);
    const [detailAttendance, setDetailAttendance] = useState([]);
    const askEnd = (id) => {
        setActiveEndId(id);
        setEndOpen(true);
    };
    const closeEnd = () => {
        setEndOpen(false);
        setActiveEndId(null);
    };
    const confirmEnd = () => {
        if (!activeEndId)
            return;
        const id = activeEndId;
        if (onEndEvent)
            onEndEvent(id);
        else
            console.log("End Event:", id);
        setFinishedId(id);
        setFinishedOpen(true);
    };
    const activeFinishedEvent = useMemo(() => {
        if (!finishedId)
            return null;
        return events.find((e) => e.id === finishedId) ?? null;
    }, [events, finishedId]);
    const openEventReport = async (eventId) => {
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
        }
        catch (e) {
            // alert(e?.message || "Failed to load report");
        }
        finally {
            setDetailLoading(false);
        }
    };
    const onDownloadFinishedReport = async () => {
        if (!activeFinishedEvent)
            return;
        try {
            const d = await fetchReportDetail(activeFinishedEvent.id);
            downloadReportPdf(d.report, d.metrics);
        }
        catch (e) {
            // alert(e?.message || "Failed to download report");
        }
    };
    return (_jsxs("div", { className: "bg-white border border-[#ececec] rounded-2xl shadow-sm", children: [_jsx(EndEventConfirmModal, { open: endOpen, onClose: closeEnd, onConfirm: () => {
                    confirmEnd();
                    closeEnd();
                } }), _jsx(EventFinishedModal, { open: finishedOpen, onClose: () => {
                    setFinishedOpen(false);
                    setFinishedId(null);
                }, eventName: activeFinishedEvent?.name ?? "Event", onDownload: onDownloadFinishedReport }), _jsx(ReportPreviewModal, { open: previewOpen, onClose: () => {
                    setPreviewOpen(false);
                    setActiveReportId(null);
                    setDetailLoading(false);
                    setDetailReport(null);
                    setDetailMetrics(null);
                    setDetailAttendance([]);
                }, report: detailReport, metrics: detailMetrics, attendance: detailAttendance, loading: detailLoading }), _jsxs("div", { className: "px-3 sm:px-4 py-4 sm:py-5 flex items-center justify-between", children: [_jsx("div", { className: "text-[13px] font-semibold text-[#111827]", children: "Event Name" }), _jsx("button", { type: "button", onClick: onViewAll, className: "cursor-pointer text-[12px] font-semibold text-[#1d4ed8]", children: "View All" })] }), _jsx("div", { className: "px-3 sm:px-4 pb-4 sm:pb-5 overflow-x-auto md:overflow-x-hidden", children: _jsxs("table", { className: "w-full min-w-[720px] md:min-w-full table-fixed text-left", children: [_jsxs("colgroup", { children: [_jsx("col", { className: "w-[27%]" }), _jsx("col", { className: "w-[8%]" }), _jsx("col", { className: "w-[10%]" }), _jsx("col", { className: "w-[9%]" }), _jsx("col", { className: "w-[8%]" }), _jsx("col", { className: "w-[11%]" }), _jsx("col", { className: "w-[8%]" })] }), _jsx("thead", { children: _jsxs("tr", { className: "text-[11px] text-[#6b7280] border-b border-[#f0f0f0] whitespace-nowrap", children: [_jsx("th", { className: "py-2.5 sm:py-3 font-semibold", children: " " }), _jsx("th", { className: "py-2.5 sm:py-3 font-semibold", children: "Template" }), _jsx("th", { className: "py-2.5 sm:py-3 font-semibold", children: "Start Time" }), _jsx("th", { className: "py-2.5 sm:py-3 font-semibold", children: "Status" }), _jsx("th", { className: "py-2.5 sm:py-3 font-semibold", children: "End Time" }), _jsx("th", { className: "py-2.5 sm:py-3 font-semibold", children: "End Event" }), _jsx("th", { className: "py-2.5 sm:py-3 font-semibold text-right", children: " " })] }) }), _jsx("tbody", { children: loading
                                ? Array.from({ length: 6 }).map((_, i) => (_jsxs("tr", { className: "border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap", children: [_jsx("td", { className: "py-3 sm:py-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ececec] animate-pulse shrink-0" }), _jsx("div", { className: "h-4 w-[200px] bg-[#ececec] rounded animate-pulse" })] }) }), _jsx("td", { className: "py-3 sm:py-4", children: _jsx("div", { className: "h-4 w-16 bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 sm:py-4", children: _jsx("div", { className: "h-4 w-20 bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 sm:py-4", children: _jsx("div", { className: "h-4 w-16 bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 sm:py-4", children: _jsx("div", { className: "h-4 w-16 bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 sm:py-4", children: _jsx("div", { className: "h-7 sm:h-8 w-24 bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 sm:py-4 text-right", children: _jsx("div", { className: "ml-auto h-4 w-16 bg-[#ececec] rounded animate-pulse" }) })] }, i)))
                                : events.map((ev) => (_jsx(EventRow, { item: ev, onEndEvent: askEnd, onShareDetails: (id) => {
                                        if (onShareDetails)
                                            return onShareDetails(id);
                                        console.log("Share Details:", id);
                                    }, onViewReport: (id) => {
                                        openEventReport(id);
                                    } }, ev.id))) })] }) })] }));
}
