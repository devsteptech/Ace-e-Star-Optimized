import type { ReportItem } from "../../../types/reportTypes";
import type { ReportMetrics } from "../../../utils/reportMetrics";

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

export default function ReportPdfView({ report, metrics }: { report: ReportItem; metrics: ReportMetrics }) {
    const maxGuests = Math.max(...metrics.timeline.map((t) => t.guests), 1);

    const checkedPct = Math.round((metrics.checkedIn / metrics.totalGuests) * 100);
    const noShowPct = Math.round((metrics.noShows / metrics.totalGuests) * 100);
    const walkInPct = Math.round((metrics.walkIns / metrics.totalGuests) * 100);

    return (
        <div className="bg-white p-8">
            {/* SAME UI */}
            <div className="bg-white border border-[#ececec] rounded-2xl p-6 sm:p-7">
                <div className="text-[14px] font-medium text-[#111827]">Event Summary</div>

                <div className="mt-2 text-[22px] sm:text-[28px] font-extrabold text-[#717182]">
                    {report.name} <span className="font-extrabold">•</span> {report.date}
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                    <div className="flex items-start gap-3">
                        <div className="text-[#4A5565] mt-0.5">
                            <StatIcon type="users" />
                        </div>
                        <div>
                            <div className="text-[13px] text-[#4A5565] font-medium">Total Guests</div>
                            <div className="text-[36px] leading-none font-extrabold text-[#101828]">{metrics.totalGuests}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="text-[#00A63E] mt-0.5">
                            <StatIcon type="check" />
                        </div>
                        <div>
                            <div className="text-[13px] text-[#00A63E] font-medium">Checked In</div>
                            <div className="text-[36px] leading-none font-extrabold text-[#0D542B]">{metrics.checkedIn}</div>
                            <div className="text-[13px] text-[#4A5565]">{checkedPct}% Attendance</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="text-[#155DFC] mt-0.5">
                            <StatIcon type="walkin" />
                        </div>
                        <div>
                            <div className="text-[13px] text-[#155DFC] font-medium">Walk-ins</div>
                            <div className="text-[36px] leading-none font-extrabold text-[#1C398E]">{metrics.walkIns}</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="text-[#4A5565] mt-0.5">
                            <StatIcon type="clock" />
                        </div>
                        <div>
                            <div className="text-[13px] text-[#4A5565] font-medium">Avg Check-in</div>
                            <div className="text-[36px] leading-none font-extrabold text-[#101828]">
                                {metrics.avgCheckInMin} min
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ...rest same as your code (keep as-is) */}
            <div className="mt-6">
                <div className="w-full rounded-2xl bg-[#f3f4f6] p-1 flex">
                    <div className="flex-1 h-10 rounded-xl bg-white text-[#111827] text-[14px] font-medium grid place-items-center shadow-sm">
                        Attendance
                    </div>
                    <div className="flex-1 h-10 rounded-xl text-[#111827] text-[14px] font-medium grid place-items-center opacity-90">
                        Analytics
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-white border border-[#ececec] rounded-2xl p-6">
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
        </div>
    );
}