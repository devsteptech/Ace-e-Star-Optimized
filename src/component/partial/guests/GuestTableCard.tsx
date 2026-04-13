import { useState } from "react";
import type { GuestListItem } from "../../../types/guestListTypes";
import GuestRow from "./GuestRow";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditGuestModal from "./EditGuestModal";
import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";

type GuestField = { id: string; label: string; fieldName: string };

export default function GuestTableCard({
    loading,
    guests,
    fields,
}: {
    loading: boolean;
    guests: GuestListItem[];
    fields: GuestField[];
}) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [activeEditId, setActiveEditId] = useState<string | null>(null);

    const activeEditGuest = activeEditId ? guests.find((x) => x.id === activeEditId) : undefined;

    const askDelete = (id: string) => {
        setActiveDeleteId(id);
        setDeleteOpen(true);
    };

    const closeDelete = () => {
        setDeleteOpen(false);
        setActiveDeleteId(null);
    };

    const confirmDelete = async () => {
        if (!activeDeleteId) return;
        await eventmanGuestsRepo.remove(activeDeleteId);
        closeDelete();
        window.dispatchEvent(new Event("guests:changed"));
    };

    const askEdit = (id: string) => {
        setActiveEditId(id);
        setEditOpen(true);
    };

    const closeEdit = () => {
        setEditOpen(false);
        setActiveEditId(null);
    };

    const saveEdit = async (payload: { name: string; relation: string }) => {
        if (!activeEditId) return;
        await eventmanGuestsRepo.edit(activeEditId, payload);
        closeEdit();
        window.dispatchEvent(new Event("guests:changed"));
    };

    const colClassForField = (idx: number) => {
        if (idx === 0) return "w-[22%]";
        if (idx === 1) return "w-[14%]";
        return "w-[18%]";
    };

    return (
        <div className="bg-white rounded-2xl">
            <DeleteConfirmModal
                open={deleteOpen}
                onClose={closeDelete}
                onConfirm={confirmDelete}
                title={"Are you sure you want\nto delete?"}
                confirmText="Yes"
                cancelText="No"
            />

            <EditGuestModal
                open={editOpen}
                onClose={closeEdit}
                onSave={saveEdit}
                initialName={activeEditGuest?.name ?? ""}
                initialRelation={activeEditGuest?.relation ?? ""}
            />

            <div className="overflow-x-auto md:overflow-x-hidden">
                <table className="w-full min-w-[920px] md:min-w-full table-fixed text-left">
                    <colgroup>
                        {fields.map((f, idx) => (
                            <col key={f.id} className={colClassForField(idx)} />
                        ))}

                        <col className="w-[18%]" />
                        <col className="w-[16%]" />
                        <col className="w-[16%]" />
                        <col className="w-[5%]" />
                        <col className="w-[4%]" />
                    </colgroup>

                    <thead>
                        <tr className="text-[12px] text-[#0A0A0A] border-b border-[#f0f0f0] whitespace-nowrap">
                            {fields.map((f) => (
                                <th key={f.id} className="py-3 font-semibold">
                                    {f.label || "Field"}
                                </th>
                            ))}

                            <th className="py-3 font-semibold">Status</th>
                            <th className="py-3 font-semibold">Check-in Time</th>
                            <th className="py-3 font-semibold">Type</th>
                            <th className="py-3 font-semibold text-right"></th>
                            <th className="py-3 font-semibold text-right"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading
                            ? Array.from({ length: 10 }).map((_, i) => (
                                <tr key={i} className="border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap">
                                    {fields.map((f, idx) => (
                                        <td key={f.id} className="py-4">
                                            <div
                                                className={`h-4 ${idx === 0 ? "w-[180px]" : idx === 1 ? "w-[90px]" : "w-[140px]"
                                                    } bg-[#ececec] rounded animate-pulse`}
                                            />
                                        </td>
                                    ))}

                                    <td className="py-4">
                                        <div className="h-6 w-[110px] bg-[#ececec] rounded-full animate-pulse" />
                                    </td>
                                    <td className="py-4">
                                        <div className="h-4 w-[90px] bg-[#ececec] rounded animate-pulse" />
                                    </td>
                                    <td className="py-4">
                                        <div className="h-6 w-[120px] bg-[#ececec] rounded-md animate-pulse" />
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="ml-auto h-10 w-10 bg-[#ececec] rounded-lg animate-pulse" />
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="ml-auto h-10 w-10 bg-[#ececec] rounded-lg animate-pulse" />
                                    </td>
                                </tr>
                            ))
                            : guests.map((g) => (
                                <GuestRow key={g.id} item={g} fields={fields} onEdit={askEdit} onDelete={askDelete} />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}