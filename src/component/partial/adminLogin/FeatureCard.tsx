type Props = {
    iconSrc: string;
    iconAlt: string;
    title: string;
    description: string;
};

export default function FeatureCard({ iconSrc, iconAlt, title, description }: Props) {
    return (
        <div className="w-full max-w-[640px] mx-auto bg-white/90 border border-[#ececec] rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.12)] px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FCC125] flex items-center justify-center">
                <img src={iconSrc} alt={iconAlt} className="w-7 h-7 object-contain" />
            </div>
            <div>
                <div className="text-[18px] font-bold text-[#1f2937]">{title}</div>
                <div className="text-[14px] text-[#6b7280] mt-1">{description}</div>
            </div>
        </div>
    );
}