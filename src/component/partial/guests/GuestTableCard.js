import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import GuestRow from "./GuestRow";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditGuestModal from "./EditGuestModal";
import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";
export default function GuestTableCard({ loading, guests, fields, }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [activeDeleteId, setActiveDeleteId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [activeEditId, setActiveEditId] = useState(null);
    const activeEditGuest = activeEditId ? guests.find((x) => x.id === activeEditId) : undefined;
    const askDelete = (id) => {
        setActiveDeleteId(id);
        setDeleteOpen(true);
    };
    const closeDelete = () => {
        setDeleteOpen(false);
        setActiveDeleteId(null);
    };
    const confirmDelete = async () => {
        if (!activeDeleteId)
            return;
        await eventmanGuestsRepo.remove(activeDeleteId);
        closeDelete();
        window.dispatchEvent(new Event("guests:changed"));
    };
    const askEdit = (id) => {
        setActiveEditId(id);
        setEditOpen(true);
    };
    const closeEdit = () => {
        setEditOpen(false);
        setActiveEditId(null);
    };
    const saveEdit = async (payload) => {
        if (!activeEditId)
            return;
        await eventmanGuestsRepo.edit(activeEditId, payload);
        closeEdit();
        window.dispatchEvent(new Event("guests:changed"));
    };
    const colClassForField = (idx) => {
        if (idx === 0)
            return "w-[22%]";
        if (idx === 1)
            return "w-[14%]";
        return "w-[18%]";
    };
    return (_jsxs("div", { className: "bg-white rounded-2xl", children: [_jsx(DeleteConfirmModal, { open: deleteOpen, onClose: closeDelete, onConfirm: confirmDelete, title: "Are you sure you want\nto delete?", confirmText: "Yes", cancelText: "No" }), _jsx(EditGuestModal, { open: editOpen, onClose: closeEdit, onSave: saveEdit, initialName: activeEditGuest?.name ?? "", initialRelation: activeEditGuest?.relation ?? "" }), _jsx("div", { className: "overflow-x-auto md:overflow-x-hidden", children: _jsxs("table", { className: "w-full min-w-[920px] md:min-w-full table-fixed text-left", children: [_jsxs("colgroup", { children: [fields.map((f, idx) => (_jsx("col", { className: colClassForField(idx) }, f.id))), _jsx("col", { className: "w-[18%]" }), _jsx("col", { className: "w-[16%]" }), _jsx("col", { className: "w-[16%]" }), _jsx("col", { className: "w-[5%]" }), _jsx("col", { className: "w-[4%]" })] }), _jsx("thead", { children: _jsxs("tr", { className: "text-[12px] text-[#0A0A0A] border-b border-[#f0f0f0] whitespace-nowrap", children: [fields.map((f) => (_jsx("th", { className: "py-3 font-semibold", children: f.label || "Field" }, f.id))), _jsx("th", { className: "py-3 font-semibold", children: "Status" }), _jsx("th", { className: "py-3 font-semibold", children: "Check-in Time" }), _jsx("th", { className: "py-3 font-semibold", children: "Type" }), _jsx("th", { className: "py-3 font-semibold text-right" }), _jsx("th", { className: "py-3 font-semibold text-right" })] }) }), _jsx("tbody", { children: loading
                                ? Array.from({ length: 10 }).map((_, i) => (_jsxs("tr", { className: "border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap", children: [fields.map((f, idx) => (_jsx("td", { className: "py-4", children: _jsx("div", { className: `h-4 ${idx === 0 ? "w-[180px]" : idx === 1 ? "w-[90px]" : "w-[140px]"} bg-[#ececec] rounded animate-pulse` }) }, f.id))), _jsx("td", { className: "py-4", children: _jsx("div", { className: "h-6 w-[110px] bg-[#ececec] rounded-full animate-pulse" }) }), _jsx("td", { className: "py-4", children: _jsx("div", { className: "h-4 w-[90px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-4", children: _jsx("div", { className: "h-6 w-[120px] bg-[#ececec] rounded-md animate-pulse" }) }), _jsx("td", { className: "py-4 text-right", children: _jsx("div", { className: "ml-auto h-10 w-10 bg-[#ececec] rounded-lg animate-pulse" }) }), _jsx("td", { className: "py-4 text-right", children: _jsx("div", { className: "ml-auto h-10 w-10 bg-[#ececec] rounded-lg animate-pulse" }) })] }, i)))
                                : guests.map((g) => (_jsx(GuestRow, { item: g, fields: fields, onEdit: askEdit, onDelete: askDelete }, g.id))) })] }) })] }));
}
