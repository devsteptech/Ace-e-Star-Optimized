import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StepTimeline({ step, enableCheckoutTag, }) {
    const steps = enableCheckoutTag
        ? [
            { key: 1, num: 1, label: "User Screen Template" },
            { key: 2, num: 2, label: "Check In Tag Template" },
            { key: 3, num: 3, label: "Check Out Tag Template" },
            { key: 4, num: 4, label: "Finalizing" },
        ]
        : [
            { key: 1, num: 1, label: "User Screen Template" },
            { key: 2, num: 2, label: "Check In Tag Template" },
            { key: 3, num: 3, label: "Finalizing" },
        ];
    const StepItem = ({ num, label, done }) => (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: [
                    "w-7 h-7 rounded-md grid place-items-center text-[12px] font-bold border",
                    done
                        ? "bg-[#f6b426] border-[#f6b426] text-white"
                        : "bg-white border-[#e5e7eb] text-[#6b7280]",
                ].join(" "), children: num }), _jsx("div", { className: "text-[10px] font-medium text-[#6b7280] whitespace-nowrap text-center", children: label })] }));
    return (_jsxs("div", { className: "w-full", children: [_jsx("div", { className: "sm:hidden grid grid-cols-2 gap-x-6 gap-y-5 max-w-[520px] mx-auto", children: steps.map((s) => (_jsx("div", { className: "flex justify-center", children: _jsx(StepItem, { num: s.num, label: s.label, done: s.num <= step }) }, s.num))) }), _jsx("div", { className: "hidden sm:block w-full max-w-[900px] mx-auto px-4", children: _jsx("div", { className: "flex items-start", children: steps.map((s, idx) => {
                        const isDoneOrActive = step >= s.key;
                        const leftActive = step >= s.key;
                        const rightActive = step > s.key;
                        return (_jsxs("div", { className: "relative flex-1 flex flex-col items-center", children: [idx !== 0 && (_jsx("div", { className: [
                                        "absolute top-[14px] left-0 right-1/2 h-[2px] z-0",
                                        leftActive ? "bg-[#f6b426]" : "bg-[#e5e7eb]",
                                    ].join(" ") })), idx !== steps.length - 1 && (_jsx("div", { className: [
                                        "absolute top-[14px] left-1/2 right-0 h-[2px] z-0",
                                        rightActive ? "bg-[#f6b426]" : "bg-[#e5e7eb]",
                                    ].join(" ") })), _jsx("div", { className: [
                                        "relative z-10 w-7 h-7 rounded-md grid place-items-center text-[12px] font-bold border",
                                        isDoneOrActive
                                            ? "bg-[#f6b426] border-[#f6b426] text-white"
                                            : "bg-white border-[#e5e7eb] text-[#6b7280]",
                                    ].join(" "), children: s.num }), _jsx("div", { className: "mt-2 text-[10px] sm:text-[11px] font-medium text-[#6b7280] whitespace-nowrap", children: s.label })] }, s.num));
                    }) }) })] }));
}
