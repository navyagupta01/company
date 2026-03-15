import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    collapsed: boolean;
    toggle: () => void;
    sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType>({
    collapsed: false,
    toggle: () => {},
    sidebarWidth: 260,
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed((p) => !p);
    const sidebarWidth = collapsed ? 64 : 260;

    return (
        <SidebarContext.Provider value={{ collapsed, toggle, sidebarWidth }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
