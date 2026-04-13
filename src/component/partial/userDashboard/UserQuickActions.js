import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function UserQuickActions({ onGuestList, onAddWalkingGuest, }) {
    return (_jsxs("div", { className: "lg:w-full w-[94%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6", children: [_jsx("button", { type: "button", onClick: onGuestList, className: "cursor-pointer h-11 px-5 w-full sm:w-fit rounded-md bg-white border border-[#ececec] shadow-sm text-[12px] font-semibold text-[#374151]", children: "Guest List" }), _jsx("button", { type: "button", onClick: onAddWalkingGuest, className: "cursor-pointer h-11 px-6 w-full sm:w-fit rounded-md bg-white border border-[#ececec] shadow-sm text-[12px] font-semibold text-[#374151]", children: "Add Walking Guest" })] }));
}
