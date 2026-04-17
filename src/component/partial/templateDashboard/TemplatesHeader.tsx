import { GradianButton } from "@/component/sharing/GradianButton";

type Props = {
    loading: boolean;
    onCreate: () => void;
};

export default function TemplatesHeader({ loading, onCreate }: Props) {
    return (
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
                <h1 className="text-[24px] sm:text-[34px] font-extrabold text-[#111827]">
                    Event Templates
                </h1>
                <p className="text-[13px] sm:text-[16px] text-[#6b7280] pt-1 sm:pt-2">
                    Create and manage reusable templates for your events
                </p>
            </div>

            <button
                type="button"
                onClick={onCreate}
                disabled={loading}
                className={`cursor-pointer h-11 sm:h-12 px-5 sm:px-6 rounded-xl text-white font-semibold text-[13px] sm:text-[14px] ${GradianButton}`}>
                <span className="text-[18px] leading-none">+</span>
                Create New Template
            </button>
        </div >
    );
}