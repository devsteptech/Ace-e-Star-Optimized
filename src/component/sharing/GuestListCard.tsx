import { useMemo, useState } from "react";
import type { Guest } from "@/types/guestTypes";
import FilterInput from "./FilterInput";

type Props = {
    title?: string;
    subtitle?: string;
    guests?: Guest[];
    loading?: boolean;

    eventName?: string;
    hideViewDetail?: boolean;
};

function StatusPill({ status }: { status: string }) {
    const checked = status === "Checked In";

    return (
        <span
            className={`inline-flex items-center gap-2 h-6 px-3 rounded-sm text-[11px] font-semibold ${checked ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#e5e7eb] text-[#111827]"
                }`}
        >
            {checked ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M20 6 9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M12 6v6l4 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
            {status}
        </span>
    );
}

export default function GuestListCard({
    title = "Guest List",
    subtitle,
    guests = [],
    loading = false,
    eventName,
    hideViewDetail = false,
}: Props) {
    const sub = subtitle ?? eventName ?? "Sarah & Michael's Wedding";
    const [query, setQuery] = useState("");

    const filteredGuests = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return guests;

        return guests.filter((g) => {
            const hay = `${g.name} ${g.status} ${g.checkInTime}`.toLowerCase();
            return hay.includes(q);
        });
    }, [guests, query]);

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm">
            <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="text-[16px] font-bold text-[#0A0A0A]">{title}</div>
                    <div className="text-[12px] text-[#0A0A0A] mt-0">{sub}</div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M21 21l-4.35-4.35"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>

                        <FilterInput
                            variant="compact" value={query} onChange={setQuery} loading={loading} placeholder="Search Guests..."
                        />
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-4 pb-3 sm:pb-4 overflow-x-auto">
                <table className="w-full min-w-[550px] sm:min-w-[760px] md:min-w-full lg:min-w-[900px] text-left">
                    <thead>
                        <tr className="text-[13px] lg:text-[14px] text-[#0A0A0A] border-b border-[#f0f0f0]">
                            <th className="py-2.5 lg:py-3 font-semibold">Name</th>
                            <th className="py-2.5 lg:py-3 font-semibold">Status</th>
                            <th className="py-2.5 lg:py-3 font-semibold">Check-in Time</th>
                            <th className="py-2.5 lg:py-3 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-[13px] text-[#0A0A0A]">
                        {loading
                            ? Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx} className="border-b border-[#f0f0f0] last:border-b-0">
                                    <td className="py-3 lg:py-4">
                                        <div className="h-4 w-[180px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 lg:py-4">
                                        <div className="h-6 w-[110px] bg-[#ececec] rounded-sm animate-pulse" />
                                    </td>
                                    <td className="py-3 lg:py-4">
                                        <div className="h-4 w-[90px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-3 lg:py-4 text-right">
                                        <div className="ml-auto h-7 lg:h-8 w-[110px] bg-[#ececec] rounded-md animate-pulse" />
                                    </td>
                                </tr>
                            ))
                            : filteredGuests.map((g) => (
                                <tr key={`${g.name}-${g.checkInTime}`} className="border-b border-[#f0f0f0] last:border-b-0">
                                    <td className="py-3 lg:py-4">{g.name}</td>

                                    <td className="py-3 lg:py-4">
                                        <StatusPill status={g.status} />
                                    </td>

                                    <td className="py-3 lg:py-4 text-[#0A0A0A]">{g.checkInTime}</td>

                                    <td className="py-3 lg:py-4 text-right">
                                        <button
                                            type="button"
                                            className={`cursor-pointer h-7 lg:h-8 px-3 lg:px-4 rounded-md bg-[linear-gradient(90deg,#FFC145_0%,#FF6900_100%)] text-white text-[10px] lg:text-[11px] font-semibold shadow-sm ${hideViewDetail ? "hidden" : ""
                                                }`}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}