import FilterInput from "@/component/sharing/FilterInput";

export default function GuestListHeader({
    loading,
    query,
    onQueryChange,
}: {
    loading: boolean;
    query: string;
    onQueryChange: (v: string) => void;
}) {
    return (
        <div className="flex items-start flex-col sm:flex-row justify-between gap-4">
            <div>
                <div className="text-[16px] font-bold text-[#0A0A0A]">Guest List</div>
                <div className="text-[12px] text-[#6b7280] mt-0">
                    Sarah &amp; Michael&apos;s Wedding
                </div>
            </div>

            <div className="relative w-full sm:w-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M21 21l-4.35-4.35"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>

                <FilterInput
                    variant="wide"
                    value={query}
                    onChange={onQueryChange}
                    loading={loading}
                    placeholder="Search Guests..."
                />
            </div>
        </div>
    );
}