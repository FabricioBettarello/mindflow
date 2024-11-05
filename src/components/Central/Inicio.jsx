import React, { useEffect, useState } from 'react';
import '../../assets/css/central.css';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

function HomePainel() {
    const [projectCount, setProjectCount] = useState(0);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (loading || !user) return;

        const projectsCollectionRef = collection(firestore, `users/${user.uid}/projects`);
        const unsubscribe = onSnapshot(
            query(projectsCollectionRef),
            (querySnapshot) => {
                setProjectCount(querySnapshot.size);
            },
            (error) => {
                console.error('Erro ao buscar projetos:', error);
            }
        );

        return () => unsubscribe();
    }, [user, loading]);

    return (
        <div className="painel-container">
            <header className="painel-header">
                <h1>Bem-vindo(a) ao Painel <span>MindFlow.</span></h1>
                <p>Aqui você encontra um resumo das suas atividades e acesso rápido às suas ferramentas.</p>
            </header>

            <section className="stats-section">
                <div className="stat-card">
                    <h2>{projectCount}</h2>
                    <p>Projetos Ativos</p>
                </div>
            </section>

            <section className="quick-actions">
                <h2>Voltar ao Inicio</h2>
                <div className="actions-grid">
                    <NavLink to="/" className="action-button">
                        <i className="bi bi-house"></i> Página Inicial
                    </NavLink>
                </div>
            </section>
        </div>
    );
}

export default HomePainel;