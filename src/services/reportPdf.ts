import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";
import { ReportItem } from "@/types/reportTypes";
import { ReportMetrics } from "@/utils/reportMetrics";
import ReportPdfView from "@/component/partial/reportsDashboard/ReportPdfView";
import ReportAttendancePdfView from "@/component/partial/reportsDashboard/ReportAttendancePdfView";

type AttendanceRow = {
    id: string;
    name: string;
    relation: string;
    checkInTime: string;
    type: string;
    status: string;
    feedback?: { label: string; value: string }[];
};

function sanitizeFileName(name: string) {
    return name.replace(/[^\w\-]+/g, "_");
}

async function renderPdf(element: React.ReactElement, fileName: string) {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-10000px";
    host.style.top = "0";
    host.style.width = "1280px";
    host.style.background = "white";
    host.style.padding = "0";
    host.style.zIndex = "9999";

    document.body.appendChild(host);

    const root = createRoot(host);
    root.render(element);

    const fontsReady = (document as any).fonts?.ready;
    if (fontsReady) await fontsReady;
    await new Promise((r) => setTimeout(r, 200));

    const canvas = await html2canvas(host, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;

    if (imgH <= pageH) {
        pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH);
    } else {
        let heightLeft = imgH;
        let position = 0;

        while (heightLeft > 0) {
            pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
            heightLeft -= pageH;
            if (heightLeft > 0) {
                pdf.addPage();
                position -= pageH;
            }
        }
    }

    pdf.save(fileName);

    root.unmount();
    host.remove();
}

export async function downloadReportPdf(report: ReportItem, metrics: ReportMetrics) {
    await renderPdf(
        React.createElement(ReportPdfView, { report, metrics }),
        `${sanitizeFileName(report.name)}_analytics.pdf`
    );
}

export async function downloadAttendancePdf(report: ReportItem, attendance: AttendanceRow[]) {
    await renderPdf(
        React.createElement(ReportAttendancePdfView, { report, attendance }),
        `${sanitizeFileName(report.name)}_attendance.pdf`
    );
}