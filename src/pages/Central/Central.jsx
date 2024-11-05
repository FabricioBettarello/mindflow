import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Central/Sidebar.jsx';
import Chatbot from '../../components/Chatbot.jsx';
import ProjectView from '../../components/Central/ProjectView.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../assets/css/central.css';

function Central() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/central/home');
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleProjectSelect = (project) => {
        if (project) {
            navigate(`/central/projeto/${project.id}`);
        } else {
            setSelectedProject(null);
            navigate('/central/home');
        }
    };

    return (
        <div className="central-wrapper">
            <button className="toggle-button" onClick={toggleSidebar}>
                <i className="bi bi-window-sidebar"></i>
            </button>

            <Sidebar isOpen={isSidebarOpen} onProjectSelect={handleProjectSelect} />
            <Chatbot />
            <div className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                {selectedProject ? (
                    <ProjectView project={selectedProject} />
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}

export default Central;