import TemplateCard from "./TemplateCard";
import type { Template } from "../../../types/templateTypes";

type Props = {
    loading: boolean;
    templates: Template[];
    onUseTemplate?: (id: string) => void;
    onEditTemplate?: (id: string) => void;
    onDeleteTemplate?: (id: string) => void;
};

export default function TemplatesGrid({
    loading,
    templates,
    onUseTemplate,
    onEditTemplate,
    onDeleteTemplate,
}: Props) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white border border-[#ececec] rounded-2xl overflow-hidden shadow-sm">
                        <div className="h-[210px] bg-[#ececec] animate-pulse" />
                        <div className="p-5 space-y-1">
                            <div className="h-5 w-[70%] bg-[#ececec] rounded animate-pulse" />
                            <div className="h-4 w-[85%] bg-[#ececec] rounded animate-pulse" />
                            <div className="h-4 w-[55%] bg-[#ececec] rounded animate-pulse" />
                            <div className="h-10 w-full bg-[#ececec] rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {templates.map((t) => (
                <TemplateCard
                    key={t.id}
                    item={t}
                    onUse={(id) => onUseTemplate?.(id)}
                    onEdit={(id) => onEditTemplate?.(id)}
                    onDuplicate={(id) => console.log("Duplicate:", id)}
                    onDelete={(id) => onDeleteTemplate?.(id)}
                />
            ))}
        </div>
    );
}