import { useMemo, useState } from "react";
import ReportsHeader from "@/component/partial/reportsDashboard/ReportsHeader";
import ReportsTableCard from "@/component/partial/reportsDashboard/ReportsTableCard";
import ReportPreviewModal from "@/component/partial/reportsDashboard/ReportPreviewModal";
import type { ReportItem } from "@/types/reportTypes";
import type { ReportMetrics } from "@/utils/reportMetrics";
import { useReports } from "@/hooks/useReports";
import { fetchReportDetail } from "@/services/reportsService";
import { downloadReportPdf } from "@/services/reportPdf";

export default function ReportsDashboard() {
    const { loading, reports } = useReports();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailReport, setDetailReport] = useState<ReportItem | null>(null);
    const [detailMetrics, setDetailMetrics] = useState<ReportMetrics | null>(null);
    const [detailAttendance, setDetailAttendance] = useState<any[]>([]);

    const onView = async (id: string) => {
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
        } catch (e: any) {
            // alert(e?.message || "Failed to load report");
        } finally {
            setDetailLoading(false);
        }
    };

    const onDownload = async (id: string) => {
        try {
            const d = await fetchReportDetail(id);
            downloadReportPdf(d.report, d.metrics);
        } catch (e: any) {
            // alert(e?.message || "Failed to download report");
        }
    };

    return (
        <div className="space-y-6">
            <ReportsHeader />

            <ReportsTableCard
                loading={loading}
                reports={reports}
                onViewReport={onView}
                onDownloadReport={onDownload}
            />

            <ReportPreviewModal
                open={previewOpen}
                onClose={() => {
                    setPreviewOpen(false);
                    setDetailLoading(false);
                    setDetailReport(null);
                    setDetailMetrics(null);
                    setDetailAttendance([]);
                }}
                report={detailReport}
                metrics={detailMetrics}
                attendance={detailAttendance as any}
                loading={detailLoading}
            />
        </div>
    );
}