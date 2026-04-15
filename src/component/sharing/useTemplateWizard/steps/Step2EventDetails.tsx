import { useEffect, useState } from "react";

export default function Step2EventDetails({
    eventName,
    eventDate,
    venue,
    description,
    expectedGuests,
    eventManagerEmail,
    logoFile,
    onEventName,
    onEventDate,
    onVenue,
    onDescription,
    onExpectedGuests,
    onEventManagerEmail,
    onLogoFile,
}: {
    eventName: string;
    eventDate: string;
    venue: string;
    description: string;
    expectedGuests: string;
    eventManagerEmail: string;
    logoFile: File | null;
    onEventName: (v: string) => void;
    onEventDate: (v: string) => void;
    onVenue: (v: string) => void;
    onDescription: (v: string) => void;
    onExpectedGuests: (v: string) => void;
    onEventManagerEmail: (v: string) => void;
    onLogoFile: (f: File | null) => void;
}) {
    const inputClass =
        "w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[12px] text-black outline-none focus:border-[#FCC125]";

    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        if (!logoFile) {
            setPreviewUrl("");
            return;
        }
        const url = URL.createObjectURL(logoFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [logoFile]);

    return (
        <div className="w-full max-w-[980px] mx-auto">
            <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="text-[13px] font-semibold text-[#111827]">Event Details</div>
                <div className="text-[12px] text-[#6b7280] mt-1">Add event information and branding</div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Event Name</div>
                        <input value={eventName} onChange={(e) => onEventName(e.target.value)} className={inputClass} />
                    </div>

                    <div>
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Event Date</div>
                        <input type="date" value={eventDate} onChange={(e) => onEventDate(e.target.value)} className={inputClass} />
                    </div>

                    <div>
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Venue</div>
                        <input value={venue} onChange={(e) => onVenue(e.target.value)} className={inputClass} />
                    </div>

                    <div className="md:row-span-2">
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Description (Optional)</div>
                        <textarea
                            value={description}
                            onChange={(e) => onDescription(e.target.value)}
                            placeholder="Brief description of the event..."
                            className="w-full h-[124px] rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-3 text-[12px] text-black outline-none focus:border-[#FCC125] resize-none"
                        />
                    </div>

                    <div>
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Expected Guests</div>
                        <input
                            type="number"
                            inputMode="numeric"
                            min={1}
                            value={expectedGuests}
                            onChange={(e) => {
                                const v = e.target.value;
                                if (v === "" || /^\d+$/.test(v)) onExpectedGuests(v);
                            }}
                            className={`${inputClass} no-spinner`}
                        />
                    </div>

                    <div>
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Event Manager Email</div>
                        <input
                            type="email"
                            value={eventManagerEmail}
                            onChange={(e) => onEventManagerEmail(e.target.value)}
                            placeholder="manager@example.com"
                            className={inputClass}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <div className="text-[12px] font-medium text-[#111827] mb-2">Event Logo (Optional)</div>

                        <label className="cursor-pointer block w-full rounded-xl border border-[#e5e7eb] bg-white h-[118px] sm:h-[128px]">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => onLogoFile(e.target.files?.[0] ?? null)}
                            />

                            <div className="h-full w-full flex flex-col items-center justify-center text-center gap-2 text-[#6b7280] px-3">
                                {previewUrl ? (
                                    <>
                                        <img
                                            src={previewUrl}
                                            alt="Logo preview"
                                            className="h-16 w-16 rounded-lg object-cover border border-[#e5e7eb]"
                                        />
                                        <div className="text-[12px] font-medium text-[#111827] truncate max-w-[92%]">
                                            {logoFile?.name}
                                        </div>
                                        <div className="text-[11px] text-[#6b7280]">Click to change</div>
                                    </>
                                ) : (
                                    <>
                                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="M4 16l3-3 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                                            <path d="M8.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" strokeWidth="1.8" />
                                        </svg>

                                        <div className="text-[12px] font-medium">Click to upload logo</div>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}