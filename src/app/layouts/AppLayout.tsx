import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";


export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <AppHeader onMenuClick={() => setSidebarOpen(true)} />

            <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8">
                <div className="flex gap-6 py-6">
                    <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <main className="flex-1 min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}