export default function UserQuickActions({
    onGuestList,
    onAddWalkingGuest,
}: {
    onGuestList: () => void;
    onAddWalkingGuest: () => void;
    onPrinterStatus: () => void;
}) {
    return (
        <div className="lg:w-full w-[94%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <button
                type="button"
                onClick={onGuestList}
                className="cursor-pointer h-11 px-5 w-full sm:w-fit rounded-md bg-white border border-[#ececec] shadow-sm text-[12px] font-semibold text-[#374151]"
            >
                Guest List
            </button>

            <button
                type="button"
                onClick={onAddWalkingGuest}
                className="cursor-pointer h-11 px-6 w-full sm:w-fit rounded-md bg-white border border-[#ececec] shadow-sm text-[12px] font-semibold text-[#374151]"
            >
                Add Walking Guest
            </button>
        </div>
    );
}