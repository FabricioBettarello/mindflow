import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase.jsx';
import { NavLink, useNavigate } from 'react-router-dom';

function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
        passwordRef.current.type = showPassword ? 'password' : 'text';
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
        confirmPasswordRef.current.type = showConfirmPassword ? 'password' : 'text';
    };

    const handlePasswordChange = () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        setPasswordsMatch(password === confirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!passwordsMatch) return;

        try {
            await createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            setSuccess('Cadastro realizado com sucesso! Redirecionando...');
            setError(null);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error(error);

            if (error.code === 'auth/email-already-in-use') {
                setError('O email informado já está cadastrado.');
            } else {
                setError('Erro ao criar conta. Tente novamente.');
            }
            setSuccess(null);
        }
    };

    return (
        <section className='login'>
            <div className="login-container">
                <div className="login-card">
                    <h1>MindFlow.</h1>
                    <p>Organize sua mente, alcance mais.</p>

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
                    {success && (
                        <p
                            style={{
                                color: 'green',
                                fontSize: '14px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            {success}
                        </p>
                    )}

                    <form className="login-form" onSubmit={handleRegister}>
                        <div className="input-group">
                            <label htmlFor="name">Nome:</label>
                            <input type="text" id="name" placeholder="Digite seu nome" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Digite seu email"
                                required
                                ref={emailRef}
                            />
                        </div>

                        <div className="input-group password-group">
                            <label htmlFor="password">Senha:</label>
                            <div className="password-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Digite sua senha"
                                    required
                                    ref={passwordRef}
                                    onChange={handlePasswordChange}
                                />
                                <i
                                    className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                        </div>

                        <div className="input-group password-group">
                            <label htmlFor="confirm-password">Confirmar Senha:</label>
                            <div className="password-wrapper">
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirme sua senha"
                                    required
                                    ref={confirmPasswordRef}
                                    onChange={handlePasswordChange}
                                />
                                <i
                                    className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                            {!passwordsMatch && (
                                <p
                                    style={{
                                        color: 'red',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        fontWeight: '600',
                                    }}
                                >
                                    As senhas não coincidem.
                                </p>
                            )}
                        </div>

                        <button type="submit" className="login-button" disabled={!passwordsMatch}>
                            Cadastrar
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Já tem uma conta? <NavLink to="/login">Entrar</NavLink></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cadastro;
