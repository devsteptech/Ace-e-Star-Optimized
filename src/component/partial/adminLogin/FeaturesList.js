import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FeatureCard from "./FeatureCard";
export default function FeaturesList() {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(FeatureCard, { iconSrc: "/images/adminloginuser.svg", iconAlt: "Guest Management", title: "Guest Management", description: "Streamline check-ins and track attendance in real-time" }), _jsx(FeatureCard, { iconSrc: "/images/adminloginbadge.svg", iconAlt: "Badge Printing", title: "Badge Printing", description: "Create and print professional name tags instantly" }), _jsx(FeatureCard, { iconSrc: "/images/adminloginevent.svg", iconAlt: "Event Analytics", title: "Event Analytics", description: "Comprehensive reports and attendance insights" })] }));
}
