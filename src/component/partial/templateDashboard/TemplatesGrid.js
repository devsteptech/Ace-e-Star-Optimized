import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TemplateCard from "./TemplateCard";
export default function TemplatesGrid({ loading, templates, onUseTemplate, onEditTemplate, onDeleteTemplate, }) {
    if (loading) {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => (_jsxs("div", { className: "bg-white border border-[#ececec] rounded-2xl overflow-hidden shadow-sm", children: [_jsx("div", { className: "h-[210px] bg-[#ececec] animate-pulse" }), _jsxs("div", { className: "p-5 space-y-1", children: [_jsx("div", { className: "h-5 w-[70%] bg-[#ececec] rounded animate-pulse" }), _jsx("div", { className: "h-4 w-[85%] bg-[#ececec] rounded animate-pulse" }), _jsx("div", { className: "h-4 w-[55%] bg-[#ececec] rounded animate-pulse" }), _jsx("div", { className: "h-10 w-full bg-[#ececec] rounded animate-pulse" })] })] }, i))) }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: templates.map((t) => (_jsx(TemplateCard, { item: t, onUse: (id) => onUseTemplate?.(id), onEdit: (id) => onEditTemplate?.(id), onDuplicate: (id) => console.log("Duplicate:", id), onDelete: (id) => onDeleteTemplate?.(id) }, t.id))) }));
}
