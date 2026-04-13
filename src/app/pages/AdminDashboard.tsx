import GuestListCard from "@/component/sharing/GuestListCard";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardHeader from "@/component/partial/adminDashboard/DashboardHeader";
import CurrentEventCard from "@/component/partial/adminDashboard/CurrentEventCard";
import SummaryCards from "@/component/partial/adminDashboard/SummaryCards";

export default function AdminDashboard() {
    const { loading, data, refresh } = useDashboard();

    const eventName = data?.event?.name || "Event";
    const eventInfo = `${data?.event?.venue || "-"} • ${data?.event?.eventDate || "-"}`;

    return (
        <div className="space-y-6">
            <DashboardHeader loading={loading} onRefresh={refresh} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <CurrentEventCard
                    loading={loading}
                    checkedIn={data?.checkedIn ?? 0}
                    expected={data?.expected ?? 0}
                    attendance={data?.attendance ?? 0}
                    eventName={eventName}
                    eventInfo={eventInfo}
                />

                <SummaryCards
                    loading={loading}
                    activeEvents={data?.activeEvents ?? 0}
                    totalGuests={data?.totalGuests ?? 0}
                />
            </div>

            <GuestListCard
                guests={data?.guests}
                loading={loading}
                eventName={eventName}
                hideViewDetail={true}
            />
        </div>
    );
}