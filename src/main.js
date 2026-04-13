import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./css/index.css";
import "./css/app.css";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(_jsxs(BrowserRouter, { children: [_jsx(App, {}), _jsx(Toaster, { position: "top-right" })] }));
