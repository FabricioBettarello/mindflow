import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RotaPrivada from './RotaPrivada.jsx';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login/Login.jsx'
import Cadastro from './pages/Login/Cadastro.jsx';
import EsqueceuSenha from './pages/Login/EsqueceuSenha.jsx';
import NotFound from './pages/NotFound.jsx'

import Central from './pages/Central/Central.jsx';
import Inicio from './components/Central/Inicio.jsx';
import ProjectView from './components/Central/ProjectView';

import './assets/css/styles.css';
import './assets/css/navbar.css';
import './assets/css/footer.css';
import './assets/css/chat.css';
import './assets/css/login.css';
import './assets/css/notfound.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/esqueceu-senha", element: <EsqueceuSenha /> },
      {
        path: "/central",
        element: (
          <RotaPrivada>
            <Central />
          </RotaPrivada>
        ),
        children: [
          { path: "home", element: <Inicio /> },
          { path: "projeto/:id", element: <ProjectView /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);