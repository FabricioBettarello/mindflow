import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import Logo from '../assets/images/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const section = document.querySelector('#contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  const scrollToInfos = (e) => {
    e.preventDefault();
    const section = document.querySelector('#infos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <header>
      <nav>
        <br />
        <div className="navbar">
          <div className="logo">
            <NavLink to="/" onClick={closeMenu}>
              <img src={Logo} alt="MindFlow Logo" />
            </NavLink>
          </div>
          <ul className="links">
            <li>
              <NavLink to="/" className="active" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="active" onClick={scrollToInfos}>
                Saiba mais
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={scrollToContact} className="active">
                Contato
              </NavLink>
            </li>
          </ul>

          {user ? (
            <NavLink to="/central" className="action_btn">
              <i className="bi bi-window"></i> MindFlow Painel
            </NavLink>
          ) : (
            <NavLink to="/login" className="action_btn">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </NavLink>
          )}

          <div className="toggle_btn" onClick={toggleMenu}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        </div>

        <div className={`dropdown_menu ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className="active" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="active" onClick={scrollToInfos}>
              Saiba mais
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={scrollToContact} className="active">
              Contato
            </NavLink>
          </li>
          {user ? (
            <li>
              <NavLink to="/central" className="action_btn" onClick={closeMenu}>
                MindFlow Painel
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="action_btn" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;