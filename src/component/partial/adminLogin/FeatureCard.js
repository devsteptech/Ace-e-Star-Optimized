import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function FeatureCard({ iconSrc, iconAlt, title, description }) {
    return (_jsxs("div", { className: "w-full max-w-[640px] mx-auto bg-white/90 border border-[#ececec] rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.12)] px-6 py-4 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#FCC125] flex items-center justify-center", children: _jsx("img", { src: iconSrc, alt: iconAlt, className: "w-7 h-7 object-contain" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-[18px] font-bold text-[#1f2937]", children: title }), _jsx("div", { className: "text-[14px] text-[#6b7280] mt-1", children: description })] })] }));
}
