import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GuestListCard from "@/component/sharing/GuestListCard";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardHeader from "@/component/partial/adminDashboard/DashboardHeader";
import CurrentEventCard from "@/component/partial/adminDashboard/CurrentEventCard";
import SummaryCards from "@/component/partial/adminDashboard/SummaryCards";
export default function AdminDashboard() {
    const { loading, data, refresh } = useDashboard();
    const eventName = data?.event?.name || "Event";
    const eventInfo = `${data?.event?.venue || "-"} • ${data?.event?.eventDate || "-"}`;
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(DashboardHeader, { loading: loading, onRefresh: refresh }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-2", children: [_jsx(CurrentEventCard, { loading: loading, checkedIn: data?.checkedIn ?? 0, expected: data?.expected ?? 0, attendance: data?.attendance ?? 0, eventName: eventName, eventInfo: eventInfo }), _jsx(SummaryCards, { loading: loading, activeEvents: data?.activeEvents ?? 0, totalGuests: data?.totalGuests ?? 0 })] }), _jsx(GuestListCard, { guests: data?.guests, loading: loading, eventName: eventName, hideViewDetail: true })] }));
}
