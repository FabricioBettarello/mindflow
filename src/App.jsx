import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    const location = useLocation();
    const isCentralRoute = location.pathname.startsWith('/central');

    return (
        <>
            {!isCentralRoute && <Navbar />}
            <Outlet />
            {!isCentralRoute && <Footer />}
        </>
    );
};

export default App;
