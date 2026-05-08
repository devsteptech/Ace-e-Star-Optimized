import React, { useMemo } from "react";
import { ReportItem } from "@/types/reportTypes";

type AttendanceRow = {
    id: string;
    name: string;
    relation: string;
    checkInTime: string;
    type: string;
    status: string;
    feedback?: { label: string; value: string }[];
};

export default function ReportAttendancePdfView({
    report,
    attendance,
}: {
    report: ReportItem;
    attendance: AttendanceRow[];
}) {
    const rows = useMemo(() => attendance || [], [attendance]);

    const cell: React.CSSProperties = {
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 10px",
        verticalAlign: "top",
        fontSize: 12,
        color: "#111827",
    };

    const headCell: React.CSSProperties = {
        ...cell,
        fontWeight: 700,
        background: "#f9fafb",
        fontSize: 12,
        color: "#4b5563",
    };

    return (
        <div style={{ padding: 28, fontFamily: "Arial, sans-serif", background: "#fff" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>
                {report.name}
            </div>

            <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>
                {report.template} • {report.date} • {report.time}
            </div>

            <div style={{ marginTop: 18, fontSize: 16, fontWeight: 800, color: "#111827" }}>
                Attendance
            </div>

            <div style={{ marginTop: 10, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={headCell}>Name</th>
                            <th style={headCell}>Relation</th>
                            <th style={headCell}>Check-in Time</th>
                            <th style={headCell}>Status</th>
                            <th style={headCell}>Type</th>
                            <th style={headCell}>Feedback</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r, idx) => {
                            const fb = Array.isArray(r.feedback) ? r.feedback : [];
                            const fbText =
                                fb.length === 0
                                    ? "-"
                                    : fb.map((x) => `${String(x.label || "").trim()}: ${String(x.value || "").trim()}`).join(" | ");

                            return (
                                <tr key={r.id || String(idx)}>
                                    <td style={cell}>{r.name || "-"}</td>
                                    <td style={cell}>{r.relation || "-"}</td>
                                    <td style={cell}>{r.checkInTime || "-"}</td>
                                    <td style={cell}>{r.status || "-"}</td>
                                    <td style={cell}>{r.type || "-"}</td>
                                    <td style={cell}>{fbText}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}