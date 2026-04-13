export default function WelcomeBanner({
    eventName,
    logoUrl,
}: {
    eventName: string;
    logoUrl?: string;
}) {
    return (
        <div className="sm:w-[820px] w-[94%] mx-auto rounded-2xl overflow-hidden shadow-sm">
            <div className="relative bg-[url('/bg-images/userdashboardwelcomebg.png')] bg-cover bg-center bg-no-repeat px-6 sm:px-10 py-3 sm:py-7 text-center text-white">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#FF25A7_0%,#D55252_100%)] opacity-90" />

                <div className="relative grid grid-cols-[70px_1fr_70px] items-center">
                    <div className="flex justify-start">
                        {logoUrl ? <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" /> : null}
                    </div>

                    <div className="text-center">
                        <div className="text-[12px] sm:text-[13px] tracking-[0.25em] font-semibold opacity-95">
                            WELCOME TO
                        </div>
                        <div className="mt-1 text-[18px] sm:text-[22px] font-extrabold leading-tight uppercase">
                            {eventName || "EVENT"}
                        </div>
                    </div>

                    <div />
                </div>
            </div>
        </div>
    );
}