import { useEffect, useMemo, useState } from "react";
import type { ReportItem } from "../../../types/reportTypes";
import type { ReportMetrics } from "../../../utils/reportMetrics";
import { ReportAttendanceRow } from "@/services/reportsService";

function StatIcon({ type }: { type: "users" | "check" | "walkin" | "clock" }) {
    if (type === "users") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
                <path d="M6 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 11a3 3 0 1 0-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === "check") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M20 6 9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (type === "walkin") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
                <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 10h2m-1-1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" stroke="currentColor" strokeWidth="2" />
            <path
                d="M12 6v6l4 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ReportPreviewModal({
    open,
    onClose,
    report,
    metrics,
    attendance = [],
    loading = false,
}: {
    open: boolean;
    onClose: () => void;
    report: ReportItem | null;
    metrics: ReportMetrics | null;
    attendance?: ReportAttendanceRow[];
    loading?: boolean;
}) {
    const [tab, setTab] = useState<"attendance" | "analytics">("attendance");

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        setTab("attendance");
    }, [open]);

    const attendanceRows = useMemo(() => {
        return (attendance || []).map((r) => ({
            name: r.name,
            time: r.checkInTime,
        }));
    }, [attendance]);

    if (!open || !report) return null;

    if (!metrics) {
        return (
            <div className="fixed inset-0 z-[999]">
                <button
                    type="button"
                    className="absolute inset-0 bg-black/30"
                    aria-label="Close report preview"
                    onClick={onClose}
                />

                <div className="relative h-full w-full p-3 sm:p-6">
                    <div className="relative mx-auto max-w-[1280px] w-full h-full bg-white rounded-2xl border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer absolute top-4 right-4 w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white grid place-items-center z-10"
                            aria-label="Close"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                                <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        <div className="h-full w-full p-4 sm:p-8 sm:pt-16 pt-20 overflow-y-auto modal-scroll">
                            <div className="text-[13px] text-[#6b7280]">{loading ? "Loading report..." : "No data"}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const maxGuests = Math.max(...metrics.timeline.map((t) => t.guests), 1);

    const checkedPct = Math.round((metrics.checkedIn / Math.max(1, metrics.totalGuests)) * 100);
    const noShowPct = Math.round((metrics.noShows / Math.max(1, metrics.totalGuests)) * 100);
    const walkInPct = Math.round((metrics.walkIns / Math.max(1, metrics.totalGuests)) * 100);

    return (
        <div className="fixed inset-0 z-[999]">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close report preview"
                onClick={onClose}
            />

            <div className="relative h-full w-full p-3 sm:p-6">
                <div className="relative mx-auto max-w-[1280px] w-full h-full bg-white rounded-2xl border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer absolute top-4 right-4 w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white grid place-items-center z-10"
                        aria-label="Close"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="h-full w-full p-4 sm:p-8 sm:pt-16 pt-20 overflow-y-auto modal-scroll">
                        <div className="bg-white border border-[#ececec] rounded-2xl p-6 sm:p-7">
                            <div className="text-[14px] font-medium text-[#111827]">Event Summary</div>

                            <div className="mt-2 text-[22px] sm:text-[28px] font-extrabold text-[#717182]">
                                {report.name} <span className="font-extrabold">•</span> {report.date}
                            </div>

                            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="text-[#4A5565] mt-0.5">
                                        <StatIcon type="users" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-[#4A5565] font-medium">Total Guests</div>
                                        <div className=" sm:text-[36px] text-[20px] leading-none font-extrabold text-[#101828]">
                                            {metrics.totalGuests}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-[#00A63E] mt-0.5">
                                        <StatIcon type="check" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-[#00A63E] font-medium">Checked In</div>
                                        <div className="sm:text-[36px] text-[20px] leading-none font-extrabold text-[#0D542B]">
                                            {metrics.checkedIn}
                                        </div>
                                        <div className="text-[13px] text-[#4A5565]">{checkedPct}% Attendance</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-[#155DFC] mt-0.5">
                                        <StatIcon type="walkin" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-[#155DFC] font-medium">Walk-ins</div>
                                        <div className="sm:text-[36px] text-[20px] leading-none font-extrabold text-[#1C398E]">
                                            {metrics.walkIns}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-[#4A5565] mt-0.5">
                                        <StatIcon type="clock" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-[#4A5565] font-medium">Avg Check-in</div>
                                        <div className="sm:text-[36px] text-[20px] leading-none font-extrabold text-[#101828]">
                                            {metrics.avgCheckInMin} min
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="w-full rounded-2xl bg-[#f3f4f6] p-1 flex">
                                <button
                                    type="button"
                                    onClick={() => setTab("attendance")}
                                    className={[
                                        "flex-1 cursor-pointer h-10 rounded-xl text-[14px] font-medium grid place-items-center",
                                        tab === "attendance" ? "bg-white text-[#111827] shadow-sm" : "text-[#111827] opacity-90",
                                    ].join(" ")}
                                >
                                    Attendance
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setTab("analytics")}
                                    className={[
                                        "flex-1 cursor-pointer h-10 rounded-xl text-[14px] font-medium grid place-items-center",
                                        tab === "analytics" ? "bg-white text-[#111827] shadow-sm" : "text-[#111827] opacity-90",
                                    ].join(" ")}
                                >
                                    Analytics
                                </button>
                            </div>
                        </div>

                        {tab === "attendance" && (
                            <div className="mt-6 bg-white border border-[#ececec] rounded-2xl p-6">
                                <div className="text-[18px] font-medium text-[#111827]">Attendance</div>

                                <div className="mt-4 rounded-xl border border-[#f0f0f0] overflow-hidden">
                                    <div className="grid grid-cols-2 bg-[#f9fafb] px-4 py-3 text-[12px] font-semibold text-[#4A5565]">
                                        <div>Name</div>
                                        <div className="text-right">Check-in Time</div>
                                    </div>

                                    <div className="max-h-[420px] overflow-y-auto modal-scroll">
                                        {attendanceRows.map((r, idx) => (
                                            <div
                                                key={idx}
                                                className="grid grid-cols-2 px-4 py-3 text-[12px] text-[#101828] border-t border-[#f0f0f0]"
                                            >
                                                <div className="font-medium">{r.name}</div>
                                                <div className="text-right text-[#4A5565]">{r.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {tab === "analytics" && (
                            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white border border-[#ececec] rounded-2xl sm:p-6 p-4">
                                    <div className="text-[18px] font-medium text-[#111827]">Attendance Breakdown</div>

                                    <div className="mt-6 space-y-4">
                                        <div className="rounded-2xl bg-[#F0FDF4] p-6 flex items-center justify-between">
                                            <div>
                                                <div className="text-[16px] text-[#475569] font-medium">Checked In</div>
                                                <div className="mt-1 text-[28px] font-extrabold text-[#0D542B]">{metrics.checkedIn}</div>
                                            </div>

                                            <div className="w-[70px] h-[70px] rounded-2xl bg-[#FFAA00] text-white grid place-items-center text-[22px] font-extrabold">
                                                {checkedPct}%
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-[#F9FAFB] p-6 flex items-center justify-between">
                                            <div>
                                                <div className="text-[16px] text-[#475569] font-medium">No Shows</div>
                                                <div className="mt-1 text-[28px] font-extrabold text-[#101828]">{metrics.noShows}</div>
                                            </div>

                                            <div className="w-[70px] h-[70px] rounded-2xl bg-[#5E5E5E] text-white grid place-items-center text-[22px] font-extrabold">
                                                {noShowPct}%
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-[#EFF6FF] p-6 flex items-center justify-between">
                                            <div>
                                                <div className="text-[16px] text-[#475569] font-medium">Walk-in Guests</div>
                                                <div className="mt-1 text-[28px] font-extrabold text-[#1C398E]">{metrics.walkIns}</div>
                                            </div>

                                            <div className="w-[70px] h-[70px] rounded-2xl bg-[#FF6DC2] text-white grid place-items-center text-[22px] font-extrabold">
                                                {walkInPct}%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-[#ececec] rounded-2xl p-6">
                                    <div className="text-[18px] font-medium text-[#111827]">Check-in Timeline</div>

                                    <div className="mt-6 space-y-5">
                                        {metrics.timeline.map((t) => (
                                            <div key={t.time}>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-[14px] text-[#475569] font-medium">{t.time}</div>
                                                    <div className="text-[14px] text-[#111827] font-medium">{t.guests} guests</div>
                                                </div>

                                                <div className="mt-2 h-[8px] w-full rounded-full bg-[#e5e7eb] overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#155DFC]"
                                                        style={{ width: `${Math.round((t.guests / maxGuests) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-2 flex items-center gap-2 text-[14px] text-[#475569]">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                <path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path
                                                    d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span>
                                                Peak check-in time: <span className="font-medium">{metrics.peakTime}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}