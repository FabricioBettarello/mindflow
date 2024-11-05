import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import '../../assets/css/central.css';

function Sidebar({ isOpen, onProjectSelect }) {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const [renamingProject, setRenamingProject] = useState(null);
    const [renameInput, setRenameInput] = useState('');
    const menuRef = useRef(null);

    const loadProjects = async () => {
        if (!user) return;

        try {
            const projectsRef = collection(firestore, `users/${user.uid}/projects`);
            const snapshot = await getDocs(projectsRef);
            const projectsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };

    const toggleNewProjectInput = () => setIsAddingProject(!isAddingProject);

    const addProject = async () => {
        if (!newProjectName.trim()) return;
        if (!user) return;

        try {
            const projectsRef = collection(firestore, `users/${user.uid}/projects`);
            const newProject = { name: newProjectName, createdAt: new Date() };
            const docRef = await addDoc(projectsRef, newProject);

            setProjects([...projects, { id: docRef.id, ...newProject }]);
            setNewProjectName('');
            setIsAddingProject(false);
        } catch (error) {
            console.error('Erro ao adicionar projeto:', error);
        }
    };

    const deleteProject = async (id) => {
        if (!user) return;
    
        try {
            await deleteDoc(doc(firestore, `users/${user.uid}/projects/${id}`));
            setProjects(projects.filter((project) => project.id !== id));
            window.location.reload();
        } catch (error) {
            console.error('Erro ao apagar projeto:', error);
        }
    };
    

    const startRenaming = (index) => {
        setRenamingProject(index);
        setRenameInput(projects[index].name);
    };

    const finishRenaming = async (index) => {
        if (!renameInput.trim()) return;
        if (!user) return;
    
        const project = projects[index];
        try {
            await updateDoc(doc(firestore, `users/${user.uid}/projects/${project.id}`), {
                name: renameInput,
            });
    
            const updatedProjects = [...projects];
            updatedProjects[index].name = renameInput;
            setProjects(updatedProjects);
            setRenamingProject(null);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao renomear projeto:', error);
        }
    };    

    const handleRenameKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            finishRenaming(index);
        }
    };

    const toggleMenu = (index) => setMenuOpen(menuOpen === index ? null : index);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div>
                <h1>MindFlow.</h1>

                <NavLink
                    to="/central/home"
                    className={({ isActive }) =>
                        isActive ? 'sidebar-link active' : 'sidebar-link'
                    }
                >
                    <i className="bi bi-house"></i> Início
                </NavLink>

                <div className="new-project">
                    <button className="new-project-toggle" onClick={toggleNewProjectInput}>
                        <i className="bi bi-plus-circle"></i> Novo Projeto
                    </button>

                    {isAddingProject && (
                        <div className="new-project-input">
                            <input
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                placeholder="Nome do projeto"
                            />
                            <div className="add-button-wrapper">
                                <button className="add-project-button" onClick={addProject}>
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="project-list-container">
                    <ul className="project-list">
                        {projects.map((project, index) => (
                            <li key={project.id} style={{ position: 'relative' }}>
                                {renamingProject === index ? (
                                    <input
                                        type="text"
                                        value={renameInput}
                                        onChange={(e) => setRenameInput(e.target.value)}
                                        onBlur={() => finishRenaming(index)}
                                        onKeyPress={(e) => handleRenameKeyPress(e, index)}
                                        autoFocus
                                        className="rename-input"
                                    />
                                ) : (
                                    <button
                                        className="project-link"
                                        onClick={() => onProjectSelect(project)}
                                    >
                                        {project.name}
                                    </button>
                                )}

                                <button className="project-options" onClick={() => toggleMenu(index)}>
                                    &#x2022;&#x2022;&#x2022;
                                </button>

                                {menuOpen === index && (
                                    <div className="project-menu open" ref={menuRef}>
                                        <button onClick={() => startRenaming(index)}>Renomear</button>
                                        <button onClick={() => deleteProject(project.id)}>Apagar</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="sidebar-footer">
                <button onClick={() => navigate('/')} className="home-button">
                    <i className="bi bi-house"></i> Página inicial
                </button>
                <button onClick={handleLogout} className="logout-button">
                    <i className="bi bi-box-arrow-right"></i> Sair
                </button>
            </div>
        </nav>
    );
}

export default Sidebar;