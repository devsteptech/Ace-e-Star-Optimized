

type Props = {
    label: string;
    value: string;
    loading: boolean;
};

export default function MiniStat({ label, value, loading }: Props) {
    return (
        <div className="text-center min-w-[60px]">
            {loading ? (
                <div className="mx-auto h-7 w-12 bg-white/25 rounded animate-pulse" />
            ) : (
                <div className="text-[26px] font-extrabold leading-none">{value}</div>
            )}
            <div className="text-[10px] text-white/80 mt-1">{label}</div>
        </div>
    );
}