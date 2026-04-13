import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function MiniStat({ label, value, loading }) {
    return (_jsxs("div", { className: "text-center min-w-[60px]", children: [loading ? (_jsx("div", { className: "mx-auto h-7 w-12 bg-white/25 rounded animate-pulse" })) : (_jsx("div", { className: "text-[26px] font-extrabold leading-none", children: value })), _jsx("div", { className: "text-[10px] text-white/80 mt-1", children: label })] }));
}
