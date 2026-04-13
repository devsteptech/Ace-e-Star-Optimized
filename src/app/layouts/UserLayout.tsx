import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

export default function UserLayout() {
    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <UserHeader />

            <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <main className="w-full">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}