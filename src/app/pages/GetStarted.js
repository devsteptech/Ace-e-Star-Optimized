import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
import { Navigate } from "react-router-dom";
export default class GetStarted extends Component {
    state = { go: false };
    render() {
        if (this.state.go)
            return _jsx(Navigate, { to: "/WhoYouAre", replace: true });
        return (_jsx("section", { className: "bg-[url('/bg-images/started-banner.png')] bg-cover bg-center min-h-screen w-full overflow-hidden", children: _jsxs("div", { className: "max-w-[1280px] mx-auto min-h-screen flex flex-col items-center justify-between py-10 px-4", children: [_jsx("img", { className: "w-[240px] sm:w-[320px] md:w-[420px]", src: "/images/ace-logo.png", alt: "" }), _jsx("button", { onClick: () => this.setState({ go: true }), className: "btn-gradient w-[90%] sm:w-[420px] lg:w-[360px] py-[28px] sm:py-[34px]", children: _jsx("span", { children: "Get Started" }) }), _jsxs("div", { className: "w-full flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-10 text-[14px] sm:text-[17px] font-medium text-[#2f2f2f]", children: [_jsx("a", { href: "#", children: "Privacy Policy" }), _jsx("a", { href: "#", children: "Support" }), _jsx("a", { href: "#", children: "Terms And Condition" })] })] }) }));
    }
}
