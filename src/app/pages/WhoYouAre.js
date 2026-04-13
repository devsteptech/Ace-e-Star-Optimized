import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
import { Link } from "react-router-dom";
export default class WhoYouAre extends Component {
    render() {
        return (_jsx("section", { className: "bg-[url('/bg-images/WhoYouAre.png')] bg-cover bg-top-right h-[100vh] min-h-[100svh] bg-no-repeat w-full rounded-0 bg-white", children: _jsxs("div", { className: "relative z-10 mx-auto max-w-[1280px] w-full h-full px-4 sm:px-4 py-8 2xl:py-16 lg:py-8 flex flex-col", children: [_jsx("div", { className: "flex justify-center", children: _jsx("img", { className: "w-[140px] sm:w-[170px] md:w-[190px] object-contain", src: "/images/ace-logo.png", alt: "Ace E Star" }) }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center", children: [_jsx("h2", { className: "text-[28px] sm:text-[48px] lg:text-[88px] sm:leading-25 leading-10 font-bold tracking-tight text-[#484848]", children: "WHO YOU ARE?" }), _jsx("p", { className: "mt-2 text-[12px] sm:text-[18px] text-[#6b6b6b]", children: "Please select any one of the following" }), _jsxs("div", { className: "mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 lg:gap-10", children: [_jsxs(Link, { to: "/adminlogin", className: "group cursor-pointer w-[240px] sm:w-[260px] 2xl:w-[360px] h-[125px] sm:h-[165px] 2xl:h-[220px] rounded-2xl bg-white/90 border border-[#e7e7e7] shadow-[0_12px_35px_rgba(0,0,0,0.10)] transition-all duration-300 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-b hover:from-[#ff9a00] hover:to-[#ffc24b] flex flex-col items-center justify-center gap-3 lg:gap-4", children: [_jsx("div", { className: "w-12 h-12 lg:w-16 lg:h-16", children: _jsx("span", { className: "block w-full h-full bg-gradient-to-b from-[#ff9a00] to-[#ffc24b] transition-all duration-300 group-hover:bg-none group-hover:bg-white", style: {
                                                        WebkitMaskImage: "url('/images/settinguser.svg')",
                                                        maskImage: "url('/images/settinguser.svg')",
                                                        WebkitMaskRepeat: "no-repeat",
                                                        maskRepeat: "no-repeat",
                                                        WebkitMaskPosition: "center",
                                                        maskPosition: "center",
                                                        WebkitMaskSize: "contain",
                                                        maskSize: "contain",
                                                    } }) }), _jsx("span", { className: "text-[13px] sm:text-[18px] font-bold text-[#505050] group-hover:text-white transition-colors duration-300", children: "Admin" })] }), _jsxs(Link, { to: "/userlogin", className: "group cursor-pointer w-[240px] sm:w-[260px] 2xl:w-[360px] h-[125px] sm:h-[165px] 2xl:h-[220px] rounded-2xl bg-white/90 border border-[#e7e7e7] shadow-[0_12px_35px_rgba(0,0,0,0.10)] transition-all duration-300 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-b hover:from-[#ff9a00] hover:to-[#ffc24b] flex flex-col items-center justify-center gap-3 lg:gap-4", children: [_jsx("div", { className: "w-12 h-12 lg:w-16 lg:h-16", children: _jsx("span", { className: "block w-full h-full bg-gradient-to-b from-[#ff9a00] to-[#ffc24b] transition-all duration-300 group-hover:bg-none group-hover:bg-white", style: {
                                                        WebkitMaskImage: "url('/images/user.svg')",
                                                        maskImage: "url('/images/user.svg')",
                                                        WebkitMaskRepeat: "no-repeat",
                                                        maskRepeat: "no-repeat",
                                                        WebkitMaskPosition: "center",
                                                        maskPosition: "center",
                                                        WebkitMaskSize: "contain",
                                                        maskSize: "contain",
                                                    } }) }), _jsx("span", { className: "text-[13px] sm:text-[18px] font-bold text-[#505050] group-hover:text-white transition-colors duration-300", children: "User" })] })] })] }), _jsxs("div", { className: "w-full flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-10 text-[14px] sm:text-[17px] font-medium text-[#2f2f2f]", children: [_jsx("a", { href: "#", children: "Privacy Policy" }), _jsx("a", { href: "#", children: "Support" }), _jsx("a", { href: "#", children: "Terms And Condition" })] })] }) }));
    }
}
