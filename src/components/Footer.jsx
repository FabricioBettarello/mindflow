import React, { useRef } from 'react';
import Logo from '../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

function Footer() {
  const emailLabelRef = useRef(null);

  const copyToClipboard = () => {
    const emailText = emailLabelRef.current ? emailLabelRef.current.innerText : '';

    if (emailText) {
      navigator.clipboard.writeText(emailText)
        .then(() => {
          alert('E-mail copiado para a área de transferência!');
        })
        .catch(err => {
          console.error('Erro ao copiar o texto: ', err);
        });
    } else {
      console.error('Elemento de e-mail não encontrado.');
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const section = document.querySelector('#contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInfos = (e) => {
    e.preventDefault();
    const section = document.querySelector('#infos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer>
        <div id="footer_content">
          <div id="footer_contacts">
            <a href="/"><img src={Logo} alt="MindFlow Logo" /></a>
            <p>Organize sua mente, alcance mais.</p>
            <div id="footer_social_media">
              <a href="https://wa.me/5511937350748" className="footer-link" id="whatsapp">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/bettarello_comercial/" className="footer-link" id="instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://discord.gg/Ur2ttFuNaM" className="footer-link" id="discord">
                <i className="bi bi-discord"></i>
              </a>
            </div>
          </div>
          <ul className="footer-list">
            <li>
              <h3>Contato</h3>
            </li>
            <li>
              <a href="https://wa.me/5511937350748" className="footer-link">Whatsapp</a>
            </li>
            <li>
              <a href="https://www.instagram.com/bettarello_comercial/" className="footer-link">Instagram</a>
            </li>
            <li>
              <a href="https://discord.gg/Ur2ttFuNaM" className="footer-link">Discord</a>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <h3>Páginas</h3>
            </li>
            <li>
            <NavLink to="/" className="footer-link">
            Home
            </NavLink>
            </li>
            <li>
            <NavLink to="/" onClick={scrollToInfos} className="footer-link">
            Saiba mais
            </NavLink>
            </li>
            <li>
            <NavLink to="/" onClick={scrollToContact} className="footer-link">
            Contato
            </NavLink>
            </li>
          </ul>
          <div id="footer_subscribe">
            <h3>Nos envie um E-mail</h3>
            <p>Copie nosso e-mail clicando no botão <b>Copiar</b> para nos enviar uma mensagem.</p>
            <div id="input_group">
              <label htmlFor="email" ref={emailLabelRef}>fabriciobetta88@gmail.com</label>
              <button onClick={copyToClipboard}>Copiar</button>
            </div>
          </div>
        </div>
        <div id="footer_copyright">MindFlow • © Todos os direitos reservados</div>
      </footer>
    </>
  );
}

export default Footer;