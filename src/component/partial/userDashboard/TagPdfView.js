import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const sizeMap = {
    "8x2": { w: 520, h: 120 },
    "6x2": { w: 420, h: 120 },
    "4x2": { w: 320, h: 120 },
};
function norm(s) {
    return String(s ?? "").trim().toLowerCase();
}
function findField(fields, want) {
    return fields.find((x) => {
        const c = [x.id, x.fieldName, x.label].map(norm);
        return c.includes(want) || c.some((v) => v.includes(want));
    });
}
export default function TagPdfView({ mode, eventName, bgUrl, logoUrl, tagSize, fields, values, checkOutText, }) {
    const size = sizeMap[tagSize] || sizeMap["8x2"];
    const nameField = findField(fields, "name");
    const relationField = findField(fields, "relation");
    const guestName = String(values[nameField?.fieldName || "name"] || "").trim();
    const guestRelation = String(values[relationField?.fieldName || "relation"] || "").trim();
    const extras = fields
        .filter((f) => f.fieldName !== (nameField?.fieldName || "name") && f.fieldName !== (relationField?.fieldName || "relation"))
        .map((f) => {
        const v = String(values[f.fieldName] || "").trim();
        return v ? `${f.label || f.fieldName}: ${v}` : "";
    })
        .filter(Boolean);
    const message = (checkOutText || "").trim() || "Thank You For Coming";
    return (_jsx("div", { style: {
            width: size.w,
            height: size.h,
            overflow: "hidden",
            borderRadius: 12,
            border: "1px solid #ececec",
        }, children: _jsx("div", { style: {
                width: "100%",
                height: "100%",
                backgroundImage: `url('${bgUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                paddingLeft: 24,
                paddingRight: 24,
                display: "flex",
                alignItems: "center",
                fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
            }, children: _jsx("div", { style: { width: "100%" }, children: _jsxs("div", { style: {
                        display: "grid",
                        gridTemplateColumns: "70px 1fr 70px",
                        alignItems: "center",
                    }, children: [_jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-start" }, children: logoUrl ? (_jsx("img", { src: logoUrl, crossOrigin: "anonymous", alt: "Logo", style: { height: 64, width: "auto", objectFit: "contain" } })) : null }), _jsxs("div", { style: { textAlign: "center" }, children: [_jsx("div", { style: {
                                        fontSize: 11,
                                        fontWeight: 800,
                                        letterSpacing: 1,
                                        color: "#111827",
                                        textTransform: "uppercase",
                                        lineHeight: 1.1,
                                    }, children: eventName || "Event Name" }), mode === "checkin" ? (_jsxs(_Fragment, { children: [_jsx("div", { style: {
                                                marginTop: 8,
                                                fontSize: 20,
                                                fontWeight: 800,
                                                color: "#111827",
                                                lineHeight: 1.05,
                                            }, children: guestName || "Guest Name" }), _jsx("div", { style: {
                                                marginTop: 2,
                                                fontSize: 12,
                                                fontWeight: 600,
                                                color: "#374151",
                                                opacity: 0.85,
                                                lineHeight: 1.1,
                                            }, children: guestRelation || "Guest Relation" }), extras.length ? (_jsx("div", { style: {
                                                marginTop: 4,
                                                fontSize: 10,
                                                fontWeight: 600,
                                                color: "#374151",
                                                opacity: 0.85,
                                                lineHeight: 1.1,
                                            }, children: extras.slice(0, 2).map((t, i) => (_jsx("div", { children: t }, i))) })) : null] })) : (_jsx("div", { style: {
                                        marginTop: 10,
                                        fontSize: 18,
                                        fontWeight: 800,
                                        color: "#111827",
                                        lineHeight: 1.05,
                                    }, children: message }))] }), _jsx("div", {})] }) }) }) }));
}
