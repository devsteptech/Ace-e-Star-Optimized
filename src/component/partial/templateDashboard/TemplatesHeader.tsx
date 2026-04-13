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
                className="cursor-pointer h-11 sm:h-12 px-5 sm:px-6 rounded-xl text-white font-semibold text-[13px] sm:text-[14px]
        shadow-[0_12px_30px_rgba(224,130,19,0.35)]
        flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
        relative overflow-hidden isolate bg-transparent transition-transform duration-300
        hover:-translate-y-[1px]
        before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
        before:bg-[linear-gradient(90deg,#ffc145_0%,#dba61f_100%)]
        before:opacity-100 before:transition-opacity before:duration-500 before:-z-10
        after:content-[''] after:absolute after:inset-0 after:rounded-[inherit]
        after:bg-[linear-gradient(90deg,#ff3389_0%,#ff6dc2_100%)]
        after:opacity-0 after:transition-opacity after:duration-500 after:-z-10
        hover:before:opacity-0 hover:after:opacity-100"
            >
                <span className="text-[18px] leading-none">+</span>
                Create New Template
            </button>
        </div>
    );
}