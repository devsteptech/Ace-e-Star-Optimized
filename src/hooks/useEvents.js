import { fetchEvents, endEvent as endEventService } from "@/services/eventsService";
import { useCallback, useEffect, useState } from "react";
export function useEvents() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const reload = useCallback(async () => {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
    }, []);
    useEffect(() => {
        reload();
    }, [reload]);
    const endEvent = useCallback(async (id) => {
        setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status: "Completed", endTime: "just now" } : e)));
        try {
            await endEventService(id);
        }
        catch (e) {
            await reload();
            throw e;
        }
    }, [reload]);
    return { loading, events, reload, endEvent };
}
