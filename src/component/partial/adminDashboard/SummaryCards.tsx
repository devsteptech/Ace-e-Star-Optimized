type Props = {
    loading: boolean;
    activeEvents: number;
    totalGuests: number;
};

export default function SummaryCards({ loading, activeEvents, totalGuests }: Props) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
            <div className="bg-[linear-gradient(180deg,#FFC145_0%,#E08213_100%)] text-white rounded-2xl shadow-sm p-3 flex items-center gap-2">
                <img
                    src="/images/adminloginevent.svg"
                    alt="Active Events"
                    className="w-6 h-6 object-contain brightness-0 invert"
                />
                <div className="leading-tight">
                    <div className="text-[12px] font-semibold text-white/90">Active Events</div>
                    {loading ? (
                        <div className="mt-1 h-7 w-10 bg-white/25 rounded animate-pulse" />
                    ) : (
                        <div className="text-[28px] font-extrabold mt-0">
                            {String(activeEvents).padStart(2, "0")}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#FFC145_0%,#E08213_100%)] text-white rounded-2xl shadow-sm p-3 flex items-center gap-2">
                <img
                    src="/images/adminloginuser.svg"
                    alt="Total Guests"
                    className="w-6 h-6 object-contain brightness-0 invert"
                />
                <div className="leading-tight">
                    <div className="text-[13px] font-semibold text-white/90">Total Guests</div>
                    {loading ? (
                        <div className="mt-1 h-7 w-20 bg-white/25 rounded animate-pulse" />
                    ) : (
                        <div className="text-[28px] font-extrabold mt-0">
                            {totalGuests.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}