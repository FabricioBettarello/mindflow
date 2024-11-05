import React, { useRef, useState, useEffect } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase.jsx';
import { NavLink, useNavigate } from 'react-router-dom';

function EsqueceuSenha() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const emailRef = useRef(null);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, emailRef.current.value);
            setMessage('Email de recuperação enviado! Verifique sua caixa de entrada.');
            setError(null);

            setTimeout(() => {
                navigate('/login');
            }, 5000);
        } catch (error) {
            setError('Erro ao enviar o email. Verifique o endereço de email.');
            setMessage('');
        }
    };

    return (
        <section className='login'>
            <div className="login-container">
                <div className="login-card">
                    <h1>Recuperar Senha</h1>
                    <p>Digite seu email para receber um link de recuperação.</p>

                    {message && (
                        <p
                            style={{
                                color: 'green',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            {message}
                        </p>
                    )}

                    {error && (
                        <p
                            style={{
                                color: 'red',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <form className="login-form" onSubmit={handleResetPassword}>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Digite seu email"
                                ref={emailRef}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Enviar</button>
                    </form>

                    <div className="login-footer">
                        <p>Voltar para <NavLink to="/login">Login</NavLink></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EsqueceuSenha;
