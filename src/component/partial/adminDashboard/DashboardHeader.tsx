type Props = {
    loading: boolean;
    onRefresh: () => void;
};

export default function DashboardHeader({ loading, onRefresh }: Props) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-[20px] sm:text-[34px] font-extrabold text-[#111827]">
                    Live Event Dashboard
                </h1>
                <p className="text-[13px] sm:text-[16px] text-[#6b7280] pt-1 sm:pt-2 leading-3">
                    Real-time monitoring and guest management
                </p>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="cursor-pointer h-11 px-5 rounded-md justify-center border border-[#e5e7eb] bg-white text-[12px] font-medium text-[#6b7280] shadow-sm flex items-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <img
                    src="/images/refresh.svg"
                    alt="Refresh"
                    className={`w-[18px] h-[18px] object-contain ${loading ? "animate-spin" : ""}`}
                />
                Refresh
            </button>
        </div>
    );
}