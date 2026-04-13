
import type { ReportItem } from "../../../types/reportTypes";

function templateColor(template: ReportItem["template"]) {
    if (template === "Wedding") return "text-[#DC6F74]";
    if (template === "Birthday") return "text-[#008236]";
    return "text-[#111827]";
}

export default function ReportRow({
    item,
    onView,
    onDownload,
}: {
    item: ReportItem;
    onView: (id: string) => void;
    onDownload: (id: string) => void;
}) {
    return (
        <tr className="border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap">
            <td className="py-3 md:py-4 text-[12px] sm:text-[13px] font-medium text-[#0A0A0A] truncate">
                {item.name}
            </td>

            <td className={`py-3 md:py-4 text-[12px] sm:text-[13px] font-medium ${templateColor(item.template)}`}>
                {item.template}
            </td>

            <td className="py-3 md:py-4 text-[12px] sm:text-[13px] text-[#475569]">
                {item.date}
            </td>

            <td className="py-3 md:py-4 text-[12px] sm:text-[13px] text-[#475569]">
                {item.time}
            </td>

            <td className="py-3 md:py-4 text-right">
                <button
                    type="button"
                    onClick={() => onView(item.id)}
                    className="cursor-pointer text-[11px] sm:text-[12px] font-semibold text-[#2F4E92]"
                >
                    View Report
                </button>
            </td>

            <td className="py-3 md:py-4 text-right">
                <button
                    type="button"
                    onClick={() => onDownload(item.id)}
                    className="cursor-pointer h-7 sm:h-8 px-4 sm:px-5 rounded-md bg-[#FF4B4B] text-white text-[10px] sm:text-[11px] font-semibold shadow-sm"
                >
                    Download
                </button>
            </td>
        </tr>
    );
}