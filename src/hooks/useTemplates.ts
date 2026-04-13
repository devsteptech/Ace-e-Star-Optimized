import { useCallback, useEffect, useState } from "react";
import type { Template } from "../types/templateTypes";
import { templatesRepo } from "@/repositories/templates.repo";

export function useTemplates() {
    const [loading, setLoading] = useState(true);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchTemplates = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await templatesRepo.list();
            setTemplates(data);
        } catch (e: any) {
            setError(e?.message || "Failed to load templates");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const prependTemplate = (t: Template) => setTemplates((prev) => [t, ...prev]);
    const removeTemplate = (id: string) => setTemplates((prev) => prev.filter((x) => x.id !== id));

    const updateTemplateCard = (card: Template) => {
        setTemplates((prev) => {
            const idx = prev.findIndex((x) => x.id === card.id);
            if (idx === -1) return prev;
            const copy = [...prev];
            copy[idx] = card;
            return copy;
        });
    };

    return { loading, templates, error, refetch: fetchTemplates, prependTemplate, removeTemplate, updateTemplateCard };
}