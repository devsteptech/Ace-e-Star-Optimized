export default function AdminHeader() {
    return (
        <div className="flex flex-col items-center text-center">
            <img
                className="w-[170px] sm:w-[190px] object-contain"
                src="/images/ace-logo.png"
                alt="Ace E Star"
            />

            <div className="mt-4">
                <h2 className="text-[26px] sm:text-[34px] font-bold text-[#4b4b4b] leading-8">
                    Welcome to <span className="text-[#E08213]">Ace E Star</span> Admin Portal
                </h2>
                <p className="mt-2 text-[14px] sm:text-[18px] text-[#6b6b6b]">
                    Sign In To Manage Your Events
                </p>
            </div>
        </div>
    );
}