function hashId(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++)
        h = (h * 31 + id.charCodeAt(i)) >>> 0;
    return h;
}
export function getReportMetrics(report) {
    const h = hashId(report.id);
    const totalGuests = 120 + (h % 61);
    const walkIns = 3 + (h % 10);
    const checkedIn = Math.min(totalGuests, Math.max(0, totalGuests - (5 + (h % 12))));
    const noShows = Math.max(0, totalGuests - checkedIn);
    const avgCheckInMin = Number((1.5 + (h % 20) / 10).toFixed(1));
    const baseTimes = ["6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM"];
    const timeline = baseTimes.map((t, i) => ({
        time: t,
        guests: Math.max(5, ((h >> (i * 3)) % 50) + 10),
    }));
    const peak = timeline.reduce((a, b) => (b.guests > a.guests ? b : a));
    return {
        totalGuests,
        checkedIn,
        walkIns,
        noShows,
        avgCheckInMin,
        peakTime: peak.time,
        timeline,
    };
}
