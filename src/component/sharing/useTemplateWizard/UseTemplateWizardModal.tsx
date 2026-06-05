import { useEffect, useMemo, useState } from "react";
import UseTemplateStepTimeline from "./UseTemplateStepTimeline";
import Step1SelectEvent from "./steps/Step1SelectEvent";
import Step2EventDetails from "./steps/Step2EventDetails";
import Step3GuestList from "./steps/Step3GuestList";
import Step3CustomFields, { CustomField } from "./steps/Step3CustomFields";
import { useTemplates } from "@/hooks/useTemplates";
import { validateGuestsFileApi } from "@/repositories/events.repo";

export default function UseTemplateWizardModal({
    open,
    templateId,
    onClose,
    onFinish,
}: {
    open: boolean;
    templateId: string | null;
    onClose: () => void;
    onFinish?: (payload: {
        templateId: string;
        eventId: string;
        eventName: string;
        eventDate: string;
        venue: string;
        description: string;
        expectedGuests: string;
        eventManagerEmail: string;
        logoFile: File | null;
        guestFile: File | null;
        questions: CustomField[];
    }) => void;
}) {
    const { loading: templatesLoading, templates } = useTemplates();

    const lockedTemplate = !!templateId && templateId !== "create-event";
    const variant: "create" | "use" = lockedTemplate ? "use" : "create";

    const [includeGuestList, setIncludeGuestList] = useState(true); 

    const maxStep = useMemo(() => {
        if (variant === "use") return includeGuestList ? 3 : 2;
        return includeGuestList ? 4 : 3;
    }, [variant, includeGuestList]);

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedTemplateId, setSelectedTemplateId] = useState("");

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [venue, setVenue] = useState("");
    const [description, setDescription] = useState("");
    const [expectedGuests, setExpectedGuests] = useState("");
    const [eventManagerEmail, setEventManagerEmail] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const [questions, setQuestions] = useState<CustomField[]>([]);
    const [guestFile, setGuestFile] = useState<File | null>(null);

    const [submitting, setSubmitting] = useState(false);

    const effectiveTemplateId = lockedTemplate ? (templateId as string) : selectedTemplateId;

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const isValidDate = (v: string) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
        const d = new Date(v);
        return !Number.isNaN(d.getTime());
    };

    const isPositiveInt = (v: string) => /^\d+$/.test(v) && Number(v) > 0;

    useEffect(() => {
        if (!open) return;

        setStep(1);
        setIncludeGuestList(true); 
        if (!lockedTemplate) setSelectedTemplateId("");
        else setSelectedTemplateId(templateId as string);

        setEventName("");
        setEventDate("");
        setVenue("");
        setDescription("");
        setExpectedGuests("");
        setEventManagerEmail("");
        setLogoFile(null);
        setQuestions([]);
        setGuestFile(null);

        setSubmitting(false);
    }, [open, lockedTemplate, templateId]);

    useEffect(() => {
        if (!open) return;
        if (step > maxStep) setStep(maxStep as any);
    }, [includeGuestList, maxStep, open, step]);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    const normalizedQuestions = useMemo(() => {
        const defLabel = (idx: number) => `Question ${idx + 1}`;
        const defPlaceholder = () => `Enter your answer`;

        return (questions || []).map((q, idx) => {
            const label = String(q.label ?? "").trim() || defLabel(idx);
            const placeholder = String(q.placeholder ?? "").trim() || defPlaceholder();
            return { ...q, label, placeholder };
        });
    }, [questions]);

    const canContinue = useMemo(() => {
        if (!effectiveTemplateId) return false;

        if (variant === "create" && step === 1) return effectiveTemplateId.length > 0;

        if ((variant === "create" && step === 2) || (variant === "use" && step === 1)) {
            return (
                eventName.trim().length > 0 &&
                isValidDate(eventDate) &&
                venue.trim().length > 0 &&
                isPositiveInt(expectedGuests) &&
                isValidEmail(eventManagerEmail)
            );
        }

        if ((variant === "create" && step === 3) || (variant === "use" && step === 2)) {
            const labels = normalizedQuestions.map((q) => q.label.toLowerCase());
            const unique = new Set(labels).size === labels.length;
            return unique;
        }

        if (includeGuestList) {
            if ((variant === "create" && step === 4) || (variant === "use" && step === 3)) {
                return !!guestFile; 
            }
        }

        return true;
    }, [
        effectiveTemplateId,
        variant,
        step,
        includeGuestList,
        eventName,
        eventDate,
        venue,
        expectedGuests,
        eventManagerEmail,
        guestFile,
        normalizedQuestions,
    ]);

    const isFinal = step === (maxStep as any);

    const GuestListChoiceBlock = (
        <div className="mb-4 bg-white border border-[#ececec] rounded-2xl shadow-sm p-5">
            <div className="text-[13px] font-semibold text-[#111827]">Guest List</div>
            <div className="text-[12px] text-[#6b7280] mt-1">Do you want to import guest list file?</div>

            <div className="mt-3 grid grid-cols-2 gap-2 max-w-[420px]">
                <button
                    type="button"
                    onClick={() => setIncludeGuestList(true)}
                    className={[
                        "h-9 rounded-lg text-[11px] font-semibold border",
                        includeGuestList
                            ? "bg-[#2f2f2f] text-white border-[#2f2f2f]"
                            : "bg-white text-[#111827] border-[#e5e7eb]",
                    ].join(" ")}
                >
                    Yes (Upload CSV/Excel)
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setIncludeGuestList(false);
                        setGuestFile(null); 
                    }}
                    className={[
                        "h-9 rounded-lg text-[11px] font-semibold border",
                        !includeGuestList
                            ? "bg-[#2f2f2f] text-white border-[#2f2f2f]"
                            : "bg-white text-[#111827] border-[#e5e7eb]",
                    ].join(" ")}
                >
                    No (Walk-ins only)
                </button>
            </div>
        </div>
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999]">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close create event modal"
                onClick={onClose}
            />

            <div className="relative h-full w-full p-3 sm:p-6">
                <div className="relative mx-auto max-w-[980px] w-full h-full bg-white rounded-2xl border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                    <div className="h-full w-full p-4 sm:p-6 flex flex-col">
                        <div className="text-center text-[14px] sm:text-[16px] font-bold text-[#111827]">
                            Create New Event
                        </div>

                        <div className="mt-4">
                            <UseTemplateStepTimeline step={step} variant={variant} includeGuestList={includeGuestList} />
                        </div>

                        <div className="mt-6 flex-1 min-h-0 overflow-y-auto modal-scroll pb-6">
                            {variant === "create" && step === 1 && (
                                <Step1SelectEvent
                                    loading={templatesLoading}
                                    templates={templates}
                                    selectedTemplateId={selectedTemplateId}
                                    onChange={setSelectedTemplateId}
                                    locked={false}
                                    includeGuestList={includeGuestList}
                                    onIncludeGuestList={(v) => {
                                        setIncludeGuestList(v);
                                        if (!v) setGuestFile(null);
                                    }}
                                />
                            )}

                            {variant === "use" && step === 1 && GuestListChoiceBlock}

                            {((variant === "create" && step === 2) || (variant === "use" && step === 1)) && (
                                <Step2EventDetails
                                    eventName={eventName}
                                    eventDate={eventDate}
                                    venue={venue}
                                    description={description}
                                    expectedGuests={expectedGuests}
                                    eventManagerEmail={eventManagerEmail}
                                    logoFile={logoFile}
                                    onEventName={setEventName}
                                    onEventDate={setEventDate}
                                    onVenue={setVenue}
                                    onDescription={setDescription}
                                    onExpectedGuests={setExpectedGuests}
                                    onEventManagerEmail={setEventManagerEmail}
                                    onLogoFile={setLogoFile}
                                />
                            )}

                            {((variant === "create" && step === 3) || (variant === "use" && step === 2)) && (
                                <Step3CustomFields fields={questions} onChange={setQuestions} />
                            )}

                            {includeGuestList &&
                                ((variant === "create" && step === 4) || (variant === "use" && step === 3)) && (
                                    <Step3GuestList
                                        file={guestFile}
                                        onUpload={setGuestFile}
                                        headers={[
                                            "Name",
                                            "Relation",
                                            ...normalizedQuestions.map((q) => q.label).filter(Boolean),
                                        ]}
                                    />
                                )}
                        </div>

                        <div className="pt-5 border-t border-[#f0f0f0] flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    if (submitting) return;
                                    if (step === 1) return onClose();
                                    setStep((s) => (s > 1 ? ((s - 1) as any) : s));
                                }}
                                className="cursor-pointer h-9 px-6 rounded-lg bg-white border border-[#e5e7eb] text-[#111827] text-[11px] font-semibold"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                disabled={!canContinue || !effectiveTemplateId || submitting}
                                onClick={async () => {
                                   
                                    if (step < (maxStep as any)) {
                                        setStep((s) => ((s + 1) as any));
                                        return;
                                    }

                                  
                                    if (includeGuestList) {
                                        if (!guestFile) return; 
                                        setSubmitting(true);
                                        try {
                                            await validateGuestsFileApi(effectiveTemplateId, guestFile);
                                        } catch (e: any) {
                                            return;
                                        } finally {
                                            setSubmitting(false);
                                        }
                                    }

                                    onFinish?.({
                                        templateId: effectiveTemplateId,
                                        eventId: "new-event",
                                        eventName,
                                        eventDate,
                                        venue,
                                        description,
                                        expectedGuests,
                                        eventManagerEmail,
                                        logoFile,
                                        guestFile: includeGuestList ? guestFile : null,
                                        questions: normalizedQuestions,
                                    });

                                    onClose();
                                }}
                                className="cursor-pointer h-9 px-10 rounded-lg bg-[#5b5b5b] text-white text-[11px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Validating..." : isFinal ? "Done" : "Continue"}
                            </button>
                        </div>

                        {false && logoFile}
                    </div>
                </div>
            </div>
        </div>
    );
}