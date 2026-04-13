import MiniStat from "./MiniStat";

type Props = {
    loading: boolean;
    checkedIn: number;
    expected: number;
    attendance: number;
    eventName?: string;
    eventInfo?: string;
};

export default function CurrentEventCard({
    loading,
    checkedIn,
    expected,
    attendance,
    eventName,
    eventInfo,
}: Props) {
    return (
        <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-sm min-h-[110px] bg-[url('/images/homebg.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.63)_0%,rgba(0,0,0,0.63)_61%,#AEAEAE_100%)]" />

                <div className="relative px-6 py-3 text-white flex items-center justify-between gap-6">
                    <div className="min-w-0">
                        <span className="inline-flex items-center h-6 px-3 rounded-sm bg-[#F4B022] text-white text-[12px] font-semibold">
                            Current Event
                        </span>

                        <div className="mt-2 text-[18px] sm:text-[20px] font-bold leading-tight truncate">
                            {eventName || "Event"}
                        </div>

                        <div className="mt-1 text-[13px] text-white/85">
                            {eventInfo || "-"}
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center">
                        <MiniStat label="Checked In" value={String(checkedIn)} loading={loading} />
                        <div className="mx-3 h-14 w-px bg-white/35" />
                        <MiniStat label="Expected" value={String(expected)} loading={loading} />
                        <div className="mx-3 h-14 w-px bg-white/35" />
                        <MiniStat label="Attendance" value={`${attendance}%`} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}