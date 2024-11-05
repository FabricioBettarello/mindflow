import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase.jsx';
import { onAuthStateChanged } from 'firebase/auth';

function RotaPrivada({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return user ? children : null;
}

export default RotaPrivada;
