import type { FormEvent, ChangeEvent } from "react";

type Props = {
    email: string;
    password: string;
    remember: boolean;
    loading: boolean;
    error: string | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRememberChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function LoginForm({
    email,
    password,
    remember,
    loading,
    error,
    onChange,
    onRememberChange,
    onSubmit,
}: Props) {
    return (
        <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[640px] bg-white/90 border border-[#eeeeee] rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] px-6 sm:px-10 py-8 sm:py-14 h-full">
                <form className="space-y-6 text-left h-full flex flex-col justify-between" onSubmit={onSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[16px] font-medium text-[#374151] mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="admin@example.com"
                                className="w-full h-14 rounded-xl border text-black border-[#e5e7eb] bg-white px-5 text-[16px] outline-none focus:border-[#FCC125]"
                            />
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-[#374151] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="••••••••"
                                className="w-full h-14 rounded-xl border text-black border-[#e5e7eb] bg-white px-5 text-[16px] outline-none focus:border-[#FCC125]"
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-1 pb-5">
                            <label className="flex items-center gap-3 text-[15px] text-[#6b7280]">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={onRememberChange}
                                    className="h-4 w-4 accent-[#FCC125]"
                                />
                                Remember me
                            </label>

                            <a href="#" className="text-[15px] text-[#2563eb]">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer btn-gradient-bg w-full h-16 rounded-full text-white font-semibold text-[18px] shadow-[0_18px_45px_rgba(224,130,19,0.35)] flex items-center justify-center gap-3 mt-auto disabled:opacity-60"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                        <img src="/images/signin.svg" alt="Sign In" className="w-6 h-6 object-contain" />
                    </button>
                </form>
            </div>
        </div>
    );
}