import { GradianButton } from "@/component/sharing/GradianButton";

type Props = {
    loading: boolean;
    onCreate: () => void;
};

export default function EventsHeader({ loading, onCreate }: Props) {
    return (
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
                <h1 className="text-[24px] sm:text-[34px] font-extrabold text-[#111827]">
                    Event Management
                </h1>
            </div>

            <button
                type="button"
                onClick={onCreate}
                disabled={loading}
                className={`cursor-pointer h-11 sm:h-12 px-5 sm:px-6 rounded-xl text-white font-semibold text-[13px] sm:text-[14px] ${GradianButton}`}>
                <span className="text-[18px] leading-none">+</span>
                Create Event
            </button>
        </div>
    );
}