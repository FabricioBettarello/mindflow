import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAddingProject, setIsAddingProject] = useState(false);

    const toggleSidebar = (open) => setSidebarOpen(open);
    const triggerNewProjectInput = () => setIsAddingProject(true);

    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
                isAddingProject,
                triggerNewProjectInput,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
