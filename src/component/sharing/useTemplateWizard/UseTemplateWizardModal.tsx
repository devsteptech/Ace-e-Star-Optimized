import { useEffect, useMemo, useState } from "react";
import UseTemplateStepTimeline from "./UseTemplateStepTimeline";
import Step1SelectEvent from "./steps/Step1SelectEvent";
import Step2EventDetails from "./steps/Step2EventDetails";
import Step3GuestList from "./steps/Step3GuestList";
import { useTemplates } from "@/hooks/useTemplates";

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
    }) => void;
}) {
    const { loading: templatesLoading, templates } = useTemplates();

    const lockedTemplate = !!templateId && templateId !== "create-event";
    const variant: "create" | "use" = lockedTemplate ? "use" : "create";
    const maxStep = variant === "use" ? 2 : 3;

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedTemplateId, setSelectedTemplateId] = useState("");

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [venue, setVenue] = useState("");
    const [description, setDescription] = useState("");
    const [expectedGuests, setExpectedGuests] = useState("");
    const [eventManagerEmail, setEventManagerEmail] = useState(""); 
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const [guestFile, setGuestFile] = useState<File | null>(null);

    const effectiveTemplateId = lockedTemplate ? (templateId as string) : selectedTemplateId;

    useEffect(() => {
        if (!open) return;

        setStep(1);
        if (!lockedTemplate) setSelectedTemplateId("");
        else setSelectedTemplateId(templateId as string);

        setEventName("");
        setEventDate("");
        setVenue("");
        setDescription("");
        setExpectedGuests("");
        setEventManagerEmail(""); 
        setLogoFile(null);
        setGuestFile(null);
    }, [open, lockedTemplate, templateId]);

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

    const canContinue = useMemo(() => {
        if (variant === "create" && step === 1) return effectiveTemplateId.length > 0;

        if (((variant === "create" && step === 2) || (variant === "use" && step === 1))) {
            return eventManagerEmail.trim().length > 0;
        }

        return true;
    }, [variant, step, effectiveTemplateId, eventManagerEmail]);

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
                            <UseTemplateStepTimeline step={step} variant={variant} />
                        </div>

                        <div className="mt-6 flex-1 min-h-0 overflow-y-auto modal-scroll pb-6">
                            {variant === "create" && step === 1 && (
                                <Step1SelectEvent
                                    loading={templatesLoading}
                                    templates={templates}
                                    selectedTemplateId={selectedTemplateId}
                                    onChange={setSelectedTemplateId}
                                    locked={false}
                                />
                            )}

                            {((variant === "create" && step === 2) || (variant === "use" && step === 1)) && (
                                <Step2EventDetails
                                    eventName={eventName}
                                    eventDate={eventDate}
                                    venue={venue}
                                    description={description}
                                    expectedGuests={expectedGuests}
                                    eventManagerEmail={eventManagerEmail}          
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
                                <Step3GuestList onUpload={setGuestFile} />
                            )}
                        </div>

                        <div className="pt-5 border-t border-[#f0f0f0] flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    if (step === 1) return onClose();
                                    setStep((s) => (s > 1 ? ((s - 1) as any) : s));
                                }}
                                className="cursor-pointer h-9 px-6 rounded-lg bg-white border border-[#e5e7eb] text-[#111827] text-[11px] font-semibold"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                disabled={!canContinue || !effectiveTemplateId}
                                onClick={() => {
                                    if (step < maxStep) return setStep((s) => ((s + 1) as any));

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
                                        guestFile,
                                    });

                                    onClose();
                                }}
                                className="cursor-pointer h-9 px-10 rounded-lg bg-[#5b5b5b] text-white text-[11px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {step === maxStep ? "Done" : "Continue"}
                            </button>
                        </div>

                        {false && logoFile}
                    </div>
                </div>
            </div>
        </div>
    );
}