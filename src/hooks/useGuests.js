import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchGuestList } from "../services/guestsService";
export function useGuests() {
    const [loading, setLoading] = useState(false);
    const [allGuests, setAllGuests] = useState([]);
    const [query, setQuery] = useState("");
    const reload = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchGuestList();
            setAllGuests(data);
        }
        catch (e) {
            console.log("GUEST LIST LOAD ERROR:", e);
            setAllGuests([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        const handler = () => reload();
        window.addEventListener("guests:changed", handler);
        return () => window.removeEventListener("guests:changed", handler);
    }, [reload]);
    const guests = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return allGuests;
        return allGuests.filter((g) => {
            const extra = g.fields ? Object.values(g.fields).join(" ") : "";
            const hay = `${g.name} ${g.relation} ${extra} ${g.status} ${g.type}`.toLowerCase();
            return hay.includes(q);
        });
    }, [allGuests, query]);
    return { loading, guests, query, setQuery, reload };
}
