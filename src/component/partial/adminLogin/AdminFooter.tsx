type Props = {
    onBack: () => void;
};

export default function AdminFooter({ onBack }: Props) {
    return (
        <div className="mt-10 w-full flex flex-col sm:flex-row lg:pb-8 2xl:pb-0 pb-8 sm:pb-16 items-center justify-between gap-6">
            <button
                type="button"
                onClick={onBack}
                className="cursor-pointer w-[180px] h-14 border border-[#bdbdbd] bg-[#ededed] text-[#4b4b4b] font-semibold"
            >
                Back
            </button>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[14px] sm:text-[17px] font-medium text-[#2f2f2f]">
                <a href="#">Privacy Policy</a>
                <a href="#">Support</a>
                <a href="#">Terms And Condition</a>
            </div>
        </div>
    );
}