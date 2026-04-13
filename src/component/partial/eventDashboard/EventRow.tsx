import type { EventItem } from "../../../types/eventTypes";

function templateDot(template: EventItem["template"]) {
    if (template === "Wedding") return "bg-[#DCFCE7] text-[#16a34a]";
    if (template === "Birthday") return "bg-[#DBEAFE] text-[#2563eb]";
    return "bg-[#F3E8FF] text-[#7c3aed]";
}

export default function EventRow({
    item,
    onEndEvent,
    onShareDetails,
    onViewReport,
}: {
    item: EventItem;
    onEndEvent: (id: string) => void;
    onShareDetails: (id: string) => void;
    onViewReport: (id: string) => void;
}) {
    const ongoing = item.status === "On Going";

    return (
        <tr className="border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap">
            <td className="py-3 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center shrink-0 ${templateDot(
                            item.template
                        )} overflow-hidden`}
                    >
                        {item.logoUrl ? (
                            <img
                                src={item.logoUrl}
                                alt="Event Logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        )}
                    </div>

                    <div className="font-semibold min-w-0 max-w-[240px] sm:max-w-[340px] md:max-w-none truncate text-[#2E3646] text-[12px] sm:text-[13px]">
                        {item.name}
                    </div>
                </div>
            </td>

            <td className="py-3 sm:py-4 text-[11px] sm:text-[12px] text-[#99A1AF]">
                {item.template}
            </td>

            <td className="py-3 sm:py-4 text-[11px] sm:text-[12px] text-[#99A1AF]">
                {item.startTime}
            </td>

            <td className="py-3 sm:py-4 text-[11px] sm:text-[12px]">
                <span className={ongoing ? "text-[#99A1AF]" : "text-[#008236] font-semibold"}>
                    {item.status}
                </span>
            </td>

            <td className="py-3 sm:py-4 text-[11px] sm:text-[12px] text-[#99A1AF]">
                {item.endTime}
            </td>

            <td className="py-3 sm:py-4">
                {ongoing ? (
                    <button
                        type="button"
                        onClick={() => onEndEvent(item.id)}
                        className="cursor-pointer h-7 sm:h-8 px-3 sm:px-4 rounded-md bg-[#FF4B4B] text-white text-[10px] sm:text-[11px] font-semibold shadow-sm"
                    >
                        End Event
                    </button>
                ) : (
                    <div className="h-7 sm:h-8 px-3 sm:px-4 rounded-md bg-[#E3E3E3] text-[#65AB82] text-[10px] sm:text-[11px] font-semibold inline-flex items-center justify-center">
                        Completed
                    </div>
                )}
            </td>

            <td className="py-3 sm:py-4 text-right">
                {ongoing ? (
                    <button
                        type="button"
                        onClick={() => onShareDetails(item.id)}
                        className="cursor-pointer text-[11px] sm:text-[12px] font-semibold text-[#FD8F01]"
                    >
                        Share Details
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => onViewReport(item.id)}
                        className="cursor-pointer text-[11px] sm:text-[12px] font-medium text-[#747474]"
                    >
                        View Report
                    </button>
                )}
            </td>
        </tr>
    );
}