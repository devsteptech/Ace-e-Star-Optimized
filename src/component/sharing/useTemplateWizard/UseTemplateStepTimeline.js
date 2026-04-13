import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function UseTemplateStepTimeline({ step, variant, }) {
    const steps = variant === "use"
        ? [
            { num: 1, label: "Event Details" },
            { num: 2, label: "Guest List" },
        ]
        : [
            { num: 1, label: "Select Event Template" },
            { num: 2, label: "Event Details" },
            { num: 3, label: "Guest List" },
        ];
    return (_jsx("div", { className: "w-full max-w-[760px] mx-auto px-4", children: _jsx("div", { className: "flex items-start", children: steps.map((s, idx) => {
                const done = s.num <= step;
                const leftActive = step >= s.num;
                const rightActive = step > s.num;
                return (_jsxs("div", { className: "relative flex-1 flex flex-col items-center", children: [idx !== 0 && (_jsx("div", { className: [
                                "absolute top-[14px] left-0 right-1/2 h-[2px] z-0",
                                leftActive ? "bg-[#f6b426]" : "bg-[#e5e7eb]",
                            ].join(" ") })), idx !== steps.length - 1 && (_jsx("div", { className: [
                                "absolute top-[14px] left-1/2 right-0 h-[2px] z-0",
                                rightActive ? "bg-[#f6b426]" : "bg-[#e5e7eb]",
                            ].join(" ") })), _jsx("div", { className: [
                                "relative z-10 w-7 h-7 rounded-md grid place-items-center text-[12px] font-bold border",
                                done
                                    ? "bg-[#f6b426] border-[#f6b426] text-white"
                                    : "bg-white border-[#e5e7eb] text-[#6b7280]",
                            ].join(" "), children: s.num }), _jsx("div", { className: "mt-2 text-[10px] sm:text-[11px] font-medium text-[#6b7280] whitespace-nowrap text-center", children: s.label })] }, s.num));
            }) }) }));
}
