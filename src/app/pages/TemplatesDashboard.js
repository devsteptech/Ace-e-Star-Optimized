import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTemplates } from "@/hooks/useTemplates";
import TemplatesHeader from "@/component/partial/templateDashboard/TemplatesHeader";
import TemplatesGrid from "@/component/partial/templateDashboard/TemplatesGrid";
import TemplateEditorModal from "@/component/partial/templateDashboard/editor/TemplateEditorModal";
import { templatesRepo } from "@/repositories/templates.repo";
import { uploadImageApi } from "@/repositories/uploads.repo";
import { createEventApi, importGuestsApi } from "@/repositories/events.repo";
import UseTemplateWizardModal from "@/component/sharing/useTemplateWizard/UseTemplateWizardModal";
export default function TemplatesDashboard() {
    const { loading, templates, prependTemplate, removeTemplate, updateTemplateCard } = useTemplates();
    const [editorOpen, setEditorOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [useTemplateOpen, setUseTemplateOpen] = useState(false);
    const [activeTemplateId, setActiveTemplateId] = useState(null);
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(TemplatesHeader, { loading: loading, onCreate: () => {
                    setEditingId(null);
                    setEditorOpen(true);
                } }), _jsx(TemplatesGrid, { loading: loading, templates: templates, onUseTemplate: (id) => {
                    setActiveTemplateId(id);
                    setUseTemplateOpen(true);
                }, onDeleteTemplate: async (id) => {
                    const ok = confirm("Delete this template?");
                    if (!ok)
                        return;
                    try {
                        await templatesRepo.remove(id);
                        removeTemplate(id);
                    }
                    catch (e) {
                        // alert(e?.message || "Delete failed");
                    }
                }, onEditTemplate: (id) => {
                    setEditingId(id);
                    setEditorOpen(true);
                } }), _jsx(TemplateEditorModal, { open: editorOpen, templateId: editingId, onClose: () => {
                    setEditorOpen(false);
                    setEditingId(null);
                }, onSubmit: async (draft, templateId) => {
                    try {
                        if (templateId) {
                            const card = await templatesRepo.update(templateId, draft);
                            updateTemplateCard(card);
                        }
                        else {
                            const card = await templatesRepo.create(draft);
                            prependTemplate(card);
                        }
                    }
                    catch (e) {
                        // alert(e?.message || "Save failed");
                    }
                } }), _jsx(UseTemplateWizardModal, { open: useTemplateOpen, templateId: activeTemplateId, onClose: () => {
                    setUseTemplateOpen(false);
                    setActiveTemplateId(null);
                }, onFinish: async (payload) => {
                    try {
                        let logoUrl = "";
                        if (payload.logoFile)
                            logoUrl = await uploadImageApi(payload.logoFile);
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
                        // alert("Event created and guests imported.");
                    }
                    catch (e) {
                        // alert(e?.message || "Create/import failed");
                    }
                } })] }));
}
