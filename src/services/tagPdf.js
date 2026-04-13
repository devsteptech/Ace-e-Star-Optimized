import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";
import TagPdfView from "../component/partial/userDashboard/TagPdfView";
function sanitizeFileName(name) {
    return String(name || "file").replace(/[^\w\-]+/g, "_");
}
const sizeMap = {
    "8x2": { w: 520, h: 120 },
    "6x2": { w: 420, h: 120 },
    "4x2": { w: 320, h: 120 },
};
export async function downloadTagPdf(opts) {
    const size = sizeMap[opts.tagSize] || sizeMap["8x2"];
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-10000px";
    host.style.top = "0";
    host.style.width = `${size.w}px`;
    host.style.height = `${size.h}px`;
    host.style.background = "white";
    host.style.padding = "0";
    host.style.margin = "0";
    host.style.zIndex = "9999";
    document.body.appendChild(host);
    const root = createRoot(host);
    root.render(React.createElement(TagPdfView, {
        mode: opts.mode,
        eventName: opts.eventName,
        bgUrl: opts.bgUrl,
        logoUrl: opts.logoUrl,
        tagSize: opts.tagSize,
        fields: opts.fields,
        values: opts.values,
        checkOutText: opts.checkOutText,
    }));
    const fontsReady = document.fonts?.ready;
    if (fontsReady)
        await fontsReady;
    await new Promise((r) => setTimeout(r, 250));
    const canvas = await html2canvas(host, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const ptPerPx = 0.75;
    const pageW = size.w * ptPerPx;
    const pageH = size.h * ptPerPx;
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [pageW, pageH],
    });
    pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH);
    const name = opts.fileName || `${sanitizeFileName(opts.eventName)}_${opts.mode}_tag.pdf`;
    pdf.save(name);
    root.unmount();
    host.remove();
}
