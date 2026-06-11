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

    const cellBase: React.CSSProperties = {
        borderBottom: "1px solid #e5e7eb",
        padding: "10px 10px",
        fontSize: 12,
        color: "#111827",
        textAlign: "center",      
        verticalAlign: "middle",  
    };

    const headCellBase: React.CSSProperties = {
        ...cellBase,
        fontWeight: 700,
        background: "#f9fafb",
        color: "#4b5563",
    };

    const sep: React.CSSProperties = {
        borderRight: "1px solid #e5e7eb", 
    };

    const feedbackCell: React.CSSProperties = {
        ...cellBase,
        whiteSpace: "pre-line",
        wordBreak: "break-word",
        lineHeight: 1.35,
        verticalAlign: "top",
    };

    return (
        <div style={{ padding: 28, fontFamily: "Arial, sans-serif", background: "#fff" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{report.name}</div>

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
                            <th style={{ ...headCellBase, ...sep }}>Name</th>
                            <th style={{ ...headCellBase, ...sep }}>Relation</th>
                            <th style={{ ...headCellBase, ...sep }}>Check-in Time</th>
                            <th style={{ ...headCellBase, ...sep }}>Status</th>
                            <th style={{ ...headCellBase, ...sep }}>Type</th>
                            <th style={{ ...headCellBase }}>Feedback</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r, idx) => {
                            const fb = Array.isArray(r.feedback) ? r.feedback : [];
                            const fbText =
                                fb.length === 0
                                    ? "-"
                                    : fb
                                        .map(
                                            (x) =>
                                                `${String(x.label || "").trim()}: ${String(x.value || "").trim()}`
                                        )
                                        .join("\n");

                            return (
                                <tr key={r.id || String(idx)}>
                                    <td style={{ ...cellBase, ...sep }}>{r.name || "-"}</td>
                                    <td style={{ ...cellBase, ...sep }}>{r.relation || "-"}</td>
                                    <td style={{ ...cellBase, ...sep }}>{r.checkInTime || "-"}</td>
                                    <td style={{ ...cellBase, ...sep }}>{r.status || "-"}</td>
                                    <td style={{ ...cellBase, ...sep }}>{r.type || "-"}</td>
                                    <td style={feedbackCell}>{fbText}</td> {/* last => no sep */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}