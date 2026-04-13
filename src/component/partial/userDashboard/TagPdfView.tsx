import React from "react";

export type TagSize = "8x2" | "6x2" | "4x2";

export type GuestField = { id: string; label: string; fieldName: string };

const sizeMap: Record<TagSize, { w: number; h: number }> = {
    "8x2": { w: 520, h: 120 },
    "6x2": { w: 420, h: 120 },
    "4x2": { w: 320, h: 120 },
};

function norm(s: any) {
    return String(s ?? "").trim().toLowerCase();
}

function findField(fields: GuestField[], want: "name" | "relation") {
    return fields.find((x) => {
        const c = [x.id, x.fieldName, x.label].map(norm);
        return c.includes(want) || c.some((v) => v.includes(want));
    });
}

export default function TagPdfView({
    mode,
    eventName,
    bgUrl,
    logoUrl,
    tagSize,
    fields,
    values,
    checkOutText,
}: {
    mode: "checkin" | "checkout";
    eventName: string;
    bgUrl: string;
    logoUrl?: string;
    tagSize: TagSize;
    fields: GuestField[];
    values: Record<string, string>;
    checkOutText?: string;
}) {
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

    return (
        <div
            style={{
                width: size.w,
                height: size.h,
                overflow: "hidden",
                borderRadius: 12,
                border: "1px solid #ececec",
            }}
        >
            <div
                style={{
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
                }}
            >
                <div style={{ width: "100%" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "70px 1fr 70px",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    crossOrigin="anonymous"
                                    alt="Logo"
                                    style={{ height: 64, width: "auto", objectFit: "contain" }}
                                />
                            ) : null}
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    letterSpacing: 1,
                                    color: "#111827",
                                    textTransform: "uppercase",
                                    lineHeight: 1.1,
                                }}
                            >
                                {eventName || "Event Name"}
                            </div>

                            {mode === "checkin" ? (
                                <>
                                    <div
                                        style={{
                                            marginTop: 8,
                                            fontSize: 20,
                                            fontWeight: 800,
                                            color: "#111827",
                                            lineHeight: 1.05,
                                        }}
                                    >
                                        {guestName || "Guest Name"}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "#374151",
                                            opacity: 0.85,
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {guestRelation || "Guest Relation"}
                                    </div>

                                    {extras.length ? (
                                        <div
                                            style={{
                                                marginTop: 4,
                                                fontSize: 10,
                                                fontWeight: 600,
                                                color: "#374151",
                                                opacity: 0.85,
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {extras.slice(0, 2).map((t, i) => (
                                                <div key={i}>{t}</div>
                                            ))}
                                        </div>
                                    ) : null}
                                </>
                            ) : (
                                <div
                                    style={{
                                        marginTop: 10,
                                        fontSize: 18,
                                        fontWeight: 800,
                                        color: "#111827",
                                        lineHeight: 1.05,
                                    }}
                                >
                                    {message}
                                </div>
                            )}
                        </div>

                        <div />
                    </div>
                </div>
            </div>
        </div>
    );
}