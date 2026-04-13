import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import EventsHeader from "@/component/partial/eventDashboard/EventsHeader";
import EventsTableCard from "@/component/partial/eventDashboard/EventsTableCard";
import ShareDetailsModal from "@/component/partial/eventDashboard/ShareDetailsModal";
import { uploadImageApi } from "@/repositories/uploads.repo";
import { createEventApi, getEventCredentialsApi, importGuestsApi } from "@/repositories/events.repo";
import { getReportMetrics } from "../../utils/reportMetrics";
import ReportPreviewModal from "../../component/partial/reportsDashboard/ReportPreviewModal";
import { useEvents } from "@/hooks/useEvents";
import UseTemplateWizardModal from "@/component/sharing/useTemplateWizard/UseTemplateWizardModal";
export default function EventsDashboard() {
    const { loading, events, endEvent, reload } = useEvents();
    const [shareOpen, setShareOpen] = useState(false);
    const [activeShareId, setActiveShareId] = useState(null);
    const [shareEmail, setShareEmail] = useState("");
    const [sharePassword, setSharePassword] = useState("");
    const [shareLogo, setShareLogo] = useState(undefined);
    const activeEvent = useMemo(() => events.find((e) => e.id === activeShareId), [events, activeShareId]);
    const [createEventOpen, setCreateEventOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [activeReportId, setActiveReportId] = useState(null);
    const activeReport = useMemo(() => {
        if (!activeReportId)
            return null;
        const ev = events.find((e) => e.id === activeReportId);
        if (!ev)
            return null;
        const maybeDate = ev.date ?? "";
        const maybeTime = ev.time ?? ev.endTime ?? ev.startTime ?? "";
        return {
            id: ev.id,
            name: ev.name,
            template: ev.template,
            date: maybeDate,
            time: maybeTime,
        };
    }, [events, activeReportId]);
    const metrics = useMemo(() => {
        if (!activeReport)
            return null;
        return getReportMetrics(activeReport);
    }, [activeReport]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(EventsHeader, { loading: loading, onCreate: () => setCreateEventOpen(true) }), _jsx(EventsTableCard, { loading: loading, events: events, onViewAll: () => console.log("View All"), onShareDetails: async (id) => {
                    setActiveShareId(id);
                    setShareEmail("");
                    setSharePassword("");
                    setShareLogo(undefined);
                    try {
                        const data = await getEventCredentialsApi(id);
                        setShareEmail(data.eventManagerEmail || "");
                        setSharePassword(String(data.password || ""));
                        setShareLogo(data.logoUrl || "");
                        setShareOpen(true);
                    }
                    catch (e) {
                        // alert(e?.message || "Failed to load credentials");
                    }
                }, onViewReport: (id) => {
                    setActiveReportId(id);
                    setPreviewOpen(true);
                }, onEndEvent: async (id) => {
                    try {
                        await endEvent(id);
                    }
                    catch (e) {
                        // alert(e?.message || "End event failed");
                    }
                } }), _jsx(ShareDetailsModal, { open: shareOpen, onClose: () => {
                    setShareOpen(false);
                    setActiveShareId(null);
                    setShareEmail("");
                    setSharePassword("");
                    setShareLogo(undefined);
                }, eventName: activeEvent?.name ?? "Event", username: shareEmail || activeEvent?.eventManagerEmail || "", password: sharePassword, imageUrl: shareLogo || activeEvent?.logoUrl || "/images/sharedetail.png" }), _jsx(UseTemplateWizardModal, { open: createEventOpen, templateId: "create-event", onClose: () => setCreateEventOpen(false), onFinish: async (payload) => {
                    try {
                        let logoUrl = "";
                        if (payload.logoFile) {
                            logoUrl = await uploadImageApi(payload.logoFile);
                        }
                        const resp = await createEventApi({
                            templateId: payload.templateId,
                            eventName: payload.eventName,
                            eventDate: payload.eventDate,
                            venue: payload.venue,
                            description: payload.description,
                            expectedGuests: payload.expectedGuests,
                            eventManagerEmail: payload.eventManagerEmail,
                            logoUrl,
                        });
                        if (payload.guestFile) {
                            await importGuestsApi(resp.eventId, payload.guestFile);
                        }
                        await reload();
                        // alert("Event created and guests imported.");
                    }
                    catch (e) {
                        // alert(e?.message || "Create/import failed");
                    }
                } }), _jsx(ReportPreviewModal, { open: previewOpen, onClose: () => {
                    setPreviewOpen(false);
                    setActiveReportId(null);
                }, report: activeReport, metrics: metrics })] }));
}
