import { useCallback, useEffect, useState } from "react";
import { templatesRepo } from "@/repositories/templates.repo";
export function useTemplates() {
    const [loading, setLoading] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [error, setError] = useState(null);
    const fetchTemplates = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await templatesRepo.list();
            setTemplates(data);
        }
        catch (e) {
            setError(e?.message || "Failed to load templates");
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);
    const prependTemplate = (t) => setTemplates((prev) => [t, ...prev]);
    const removeTemplate = (id) => setTemplates((prev) => prev.filter((x) => x.id !== id));
    const updateTemplateCard = (card) => {
        setTemplates((prev) => {
            const idx = prev.findIndex((x) => x.id === card.id);
            if (idx === -1)
                return prev;
            const copy = [...prev];
            copy[idx] = card;
            return copy;
        });
    };
    return { loading, templates, error, refetch: fetchTemplates, prependTemplate, removeTemplate, updateTemplateCard };
}
