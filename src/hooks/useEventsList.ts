import { useCallback, useEffect, useState } from "react";
import type { EventItem } from "../types/eventTypes";
import { fetchEvents } from "../services/eventsService";

export function useEventsList() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<EventItem[]>([]);

    const reload = useCallback(async () => {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    return { loading, events, reload };
}