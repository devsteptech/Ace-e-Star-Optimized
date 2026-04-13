import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ReportsHeader from "@/component/partial/reportsDashboard/ReportsHeader";
import ReportsTableCard from "@/component/partial/reportsDashboard/ReportsTableCard";
import ReportPreviewModal from "@/component/partial/reportsDashboard/ReportPreviewModal";
import { useReports } from "@/hooks/useReports";
import { fetchReportDetail } from "@/services/reportsService";
import { downloadReportPdf } from "@/services/reportPdf";
export default function ReportsDashboard() {
    const { loading, reports } = useReports();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailReport, setDetailReport] = useState(null);
    const [detailMetrics, setDetailMetrics] = useState(null);
    const [detailAttendance, setDetailAttendance] = useState([]);
    const onView = async (id) => {
        setPreviewOpen(true);
        setDetailLoading(true);
        setDetailReport(null);
        setDetailMetrics(null);
        setDetailAttendance([]);
        try {
            const d = await fetchReportDetail(id);
            setDetailReport(d.report);
            setDetailMetrics(d.metrics);
            setDetailAttendance(d.attendance || []);
        }
        catch (e) {
            // alert(e?.message || "Failed to load report");
        }
        finally {
            setDetailLoading(false);
        }
    };
    const onDownload = async (id) => {
        try {
            const d = await fetchReportDetail(id);
            downloadReportPdf(d.report, d.metrics);
        }
        catch (e) {
            // alert(e?.message || "Failed to download report");
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(ReportsHeader, {}), _jsx(ReportsTableCard, { loading: loading, reports: reports, onViewReport: onView, onDownloadReport: onDownload }), _jsx(ReportPreviewModal, { open: previewOpen, onClose: () => {
                    setPreviewOpen(false);
                    setDetailLoading(false);
                    setDetailReport(null);
                    setDetailMetrics(null);
                    setDetailAttendance([]);
                }, report: detailReport, metrics: detailMetrics, attendance: detailAttendance, loading: detailLoading })] }));
}
