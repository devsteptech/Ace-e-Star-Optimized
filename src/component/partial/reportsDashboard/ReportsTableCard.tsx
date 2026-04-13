import ReportRow from "./ReportRow";
import type { ReportItem } from "../../../types/reportTypes";

export default function ReportsTableCard({
    loading,
    reports,
    onViewReport,
    onDownloadReport,
}: {
    loading: boolean;
    reports: ReportItem[];
    onViewReport?: (id: string) => void;
    onDownloadReport?: (id: string) => void;
}) {
    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm">
            <div className="p-5 overflow-x-auto">
                <table className="w-full min-w-[660px] text-left">
                    <thead>
                        <tr className="text-[12px] text-[#0A0A0A] border-b border-[#f0f0f0]">
                            <th className="py-3 font-semibold">Name</th>
                            <th className="py-3 font-semibold">Template</th>
                            <th className="py-3 font-semibold">Date</th>
                            <th className="py-3 font-semibold">Time</th>
                            <th className="py-3 font-semibold text-right"></th>
                            <th className="py-3 font-semibold text-right"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                <tr key={i} className="border-b border-[#f0f0f0] last:border-b-0">
                                    <td className="py-4">
                                        <div className="h-4 w-[240px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-4">
                                        <div className="h-4 w-[90px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-4">
                                        <div className="h-4 w-[90px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-4">
                                        <div className="h-4 w-[120px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="ml-auto h-4 w-[80px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="ml-auto h-8 w-[90px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                </tr>
                            ))
                            : reports.map((r) => (
                                <ReportRow
                                    key={r.id}
                                    item={r}
                                    onView={(id) => {
                                        if (onViewReport) return onViewReport(id);
                                        console.log("View Report:", id);
                                    }}
                                    onDownload={(id) => {
                                        if (onDownloadReport) return onDownloadReport(id);
                                        console.log("Download:", id);
                                    }}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}