import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

import PoliciesPage from "./Dashboard/Policies";
import ProfilePage from "./Dashboard/Profile";
import OverviewTab from "./Dashboard/Overview";

// Placeholder components for other sections
const SettingsPage = () => <div style={{ padding: "48px", color: "var(--white)" }}>Settings Page — Coming Soon</div>;

// ─── Inner layout reads sidebar width from context ─────────────────────────
const DashboardInner = () => {
    const { sidebarWidth } = useSidebar();

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <DashboardNavbar />
            <main
                style={{
                    marginLeft: sidebarWidth,
                    paddingTop: "56px",
                    flex: 1,
                    transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
                    minWidth: 0,
                }}
            >
                <Routes>
                    <Route index element={<OverviewTab />} />
                    <Route path="overview" element={<OverviewTab />} />
                    <Route path="policies" element={<PoliciesPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </main>
        </div>
    );
};

// ─── Layout shell wraps everything in SidebarProvider ─────────────────────
const DashboardLayout = () => (
    <SidebarProvider>
        <DashboardInner />
    </SidebarProvider>
);

export default DashboardLayout;
