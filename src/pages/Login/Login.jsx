import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../Firebase.jsx';
import { useNavigate, NavLink } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
        passwordRef.current.type = showPassword ? 'password' : 'text';
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            navigate('/central');
        } catch (error) {
            setError('Email ou senha incorretos.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/central');
        } catch (error) {
            setError('Falha ao fazer login com o Google.');
        }
    };

    return (
        <section className="login">
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

                    <form className="login-form" onSubmit={handleLogin}>
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
                                />
                                <i
                                    className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                        </div>

                        <div className="forgot-password">
                            <NavLink to="/esqueceu-senha">Esqueceu sua senha?</NavLink>
                        </div>

                        <button type="submit" className="login-button">Entrar</button>
                    </form>

                    <button onClick={handleGoogleLogin} className="google-login-button">
                        <i className="bi bi-google"></i> Entrar com Google
                    </button>

                    <div className="login-footer">
                        <p>
                            Não tem uma conta? <NavLink to="/cadastro">Cadastre-se</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;