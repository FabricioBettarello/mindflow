import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { auth, firestore } from '../../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { HashLoader } from 'react-spinners';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { FaBold, FaItalic, FaHeading, FaQuoteRight, FaListUl, FaCode } from 'react-icons/fa';
import 'draft-js/dist/Draft.css';
import '../../assets/css/projectView.css';

const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};

function ProjectView() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editorRef = useRef(null);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects/${id}`);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const projectData = docSnap.data();
                    setProject({ id: docSnap.id, ...projectData });

                    if (projectData.content) {
                        setEditorState(EditorState.createWithContent(convertFromRaw(projectData.content)));
                    }
                } else {
                    console.log('Projeto não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao carregar o projeto:', error);
            }
            setLoading(false);
        };

        fetchProject();
    }, [id]);

    const saveContent = useCallback(
        debounce(async (contentState) => {
            const rawContent = convertToRaw(contentState);
            const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects/${id}`);
            try {
                await updateDoc(docRef, { content: rawContent });
                console.log("Conteúdo salvo com sucesso.");
            } catch (error) {
                console.error("Erro ao salvar o conteúdo:", error);
            }
        }, 1000),
        [id]
    );

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
        saveContent(newEditorState.getCurrentContent());
    };

    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleTitleChange = (e) => {
        setProject({ ...project, name: e.target.value });
    };

    const handleTitleBlurOrEnter = async () => {
        setIsEditingTitle(false);
        try {
            const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects/${id}`);
            await updateDoc(docRef, { name: project.name });
            console.log("Nome do projeto atualizado com sucesso.");
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar o nome do projeto:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleTitleBlurOrEnter();
        }
    };

    const toggleInlineStyle = (style) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (blockType) => {
        handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const focusEditor = () => {
        editorRef.current.focus();
    };

    if (loading) {
        return (
            <div className="loader-container">
                <HashLoader color="#0084ff" size={50} />
            </div>
        );
    }

    if (!project) {
        return <div>Projeto não encontrado.</div>;
    }

    return (
        <div className="project-view">
            {isEditingTitle ? (
                <input
                    type="text"
                    value={project.name}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlurOrEnter}
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
            ) : (
                <h2 onClick={handleTitleClick}>{project.name}</h2>
            )}
            <div className="editor-toolbar">
                <button onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('BOLD'); }}>
                    <FaBold /> Bold
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('ITALIC'); }}>
                    <FaItalic /> Italic
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); toggleBlockType('header-one'); }}>
                    <FaHeading /> Título
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); toggleBlockType('blockquote'); }}>
                    <FaQuoteRight /> Quote
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); toggleBlockType('unordered-list-item'); }}>
                    <FaListUl /> Bullet List
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); toggleBlockType('code-block'); }}>
                    <FaCode /> Code Block
                </button>
            </div>
            <div className="editor-container" onClick={focusEditor}>
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={handleEditorChange}
                    placeholder="Escreva aqui..."
                />
            </div>
        </div>
    );
}

export default ProjectView;