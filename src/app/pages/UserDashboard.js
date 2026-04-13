import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import WelcomeBanner from "@/component/partial/userDashboard/WelcomeBanner";
import UserCheckForm from "@/component/partial/userDashboard/UserCheckForm";
import UserQuickActions from "@/component/partial/userDashboard/UserQuickActions";
import GuestListModal from "@/component/partial/guests/GuestListModal";
import AddWalkingGuestModal from "@/component/partial/userDashboard/AddWalkingGuestModal";
import { API_BASE_URL } from "@/config/env";
import { getMyEventConfigApi } from "@/repositories/eventman.repo";
function normalizeAssetUrl(url) {
    if (!url)
        return "";
    if (url.startsWith("http://") || url.startsWith("https://"))
        return url;
    if (url.startsWith("/"))
        return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}/${url}`;
}
export default function UserDashboard() {
    const [guestListOpen, setGuestListOpen] = useState(false);
    const [walkingGuestOpen, setWalkingGuestOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eventName, setEventName] = useState("EVENT");
    const [bgUrl, setBgUrl] = useState("/bg-images/userdashboardbg.png");
    const [eventLogoUrl, setEventLogoUrl] = useState("");
    const [screenLogoUrl, setScreenLogoUrl] = useState("");
    const [enableCheckout, setEnableCheckout] = useState(true);
    const [checkInTag, setCheckInTag] = useState({
        size: "8x2",
        bgUrl: "/bg-images/previewheaderbg.png",
        logoUrl: "",
    });
    const [checkOutTag, setCheckOutTag] = useState({
        size: "8x2",
        bgUrl: "/bg-images/checkoutbg.png",
        logoUrl: "",
    });
    const [checkOutTagText, setCheckOutTagText] = useState("");
    const [fields, setFields] = useState([
        { id: "name", label: "Your Name", fieldName: "name" },
        { id: "relation", label: "Your Relation", fieldName: "relation" },
    ]);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const cfg = await getMyEventConfigApi();
                setEventName(cfg.event?.name || "EVENT");
                const rawBg = cfg.template?.screen?.bodyBgUrl || cfg.template?.screen?.headerBgUrl || "";
                const normalizedBg = normalizeAssetUrl(rawBg);
                setBgUrl(normalizedBg || "/bg-images/userdashboardbg.png");
                setEventLogoUrl(normalizeAssetUrl(cfg.event?.logoUrl || ""));
                setScreenLogoUrl(normalizeAssetUrl(cfg.template?.screen?.logoUrl || ""));
                setEnableCheckout(!!cfg.template?.enableCheckoutTag);
                const gf = cfg.template?.guestFields || [];
                if (Array.isArray(gf) && gf.length) {
                    setFields(gf.map((f, idx) => ({
                        id: f.id || String(idx),
                        label: f.label || "Field",
                        fieldName: f.fieldName || `field_${idx + 1}`,
                    })));
                }
                const ci = cfg.template?.checkInTag || {};
                setCheckInTag({
                    size: (ci.size || "8x2"),
                    bgUrl: normalizeAssetUrl(ci.bgUrl || "") || "/bg-images/previewheaderbg.png",
                    logoUrl: normalizeAssetUrl(ci.logoUrl || ""),
                });
                const co = cfg.template?.checkOutTag || {};
                setCheckOutTag({
                    size: (co.size || "8x2"),
                    bgUrl: normalizeAssetUrl(co.bgUrl || "") || "/bg-images/checkoutbg.png",
                    logoUrl: normalizeAssetUrl(co.logoUrl || ""),
                });
                setCheckOutTagText(String(cfg.template?.checkOutTagText || ""));
            }
            catch (e) {
                console.log("CONFIG LOAD ERROR:", e);
            }
            finally {
                setLoading(false);
            }
        })();
    }, []);
    const bgStyle = useMemo(() => ({ backgroundImage: `url('${bgUrl}')` }), [bgUrl]);
    return (_jsxs("div", { className: "w-full absolute top-0 right-0 overflow-x-hidden min-h-screen bg-cover bg-center bg-no-repeat", style: bgStyle, children: [_jsxs("div", { className: "max-w-[1280px] flex flex-col justify-between mt-20 sm:mt-28 lg:mt-22 2xl:mt-26 h-[80vh] mx-auto", children: [_jsx(WelcomeBanner, { eventName: eventName, logoUrl: screenLogoUrl || eventLogoUrl }), _jsx("div", { className: "mt-6", children: _jsx(UserCheckForm, { fields: fields, enableCheckoutTag: enableCheckout, eventName: eventName, eventLogoUrl: eventLogoUrl, screenLogoUrl: screenLogoUrl, checkInTag: checkInTag, checkOutTag: checkOutTag, checkOutTagText: checkOutTagText }) }), _jsx(UserQuickActions, { onGuestList: () => setGuestListOpen(true), onAddWalkingGuest: () => setWalkingGuestOpen(true), onPrinterStatus: () => console.log("Printer Status") })] }), _jsx(GuestListModal, { isOpen: guestListOpen, onClose: () => setGuestListOpen(false), fields: fields }), _jsx(AddWalkingGuestModal, { open: walkingGuestOpen, onClose: () => setWalkingGuestOpen(false), fields: fields, enableCheckoutTag: enableCheckout, eventName: eventName, eventLogoUrl: eventLogoUrl, screenLogoUrl: screenLogoUrl, checkInTag: checkInTag, checkOutTag: checkOutTag, checkOutTagText: checkOutTagText }), loading ? null : null] }));
}
