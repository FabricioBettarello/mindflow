import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Logo from '../assets/images/logo2.png';
import ImageContact from '../assets/images/contact-us-animate.svg';

function Home() {
    
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_x28sxeg', 'template_bpgvo1m', form.current, 'sjcRQ7raDojf1fG2G')
            .then((result) => {
                console.log(result.text);
                alert('Mensagem enviada com sucesso!');
            }, (error) => {
                console.log(error.text);
                alert('Ocorreu um erro ao enviar a mensagem.');
            });

        e.target.reset();
    };

    return (
        <>
            <section className="container" id="home">
                <div className="content">
                    <h4>Organize sua mente, alcance mais.</h4>
                    <h1>
                        <span>MindFlow.</span>
                        <br />
                        Está preparado para se organizar de uma maneira melhor?
                    </h1>
                    <p>
                    <b>MindFlow</b> é uma plataforma inovadora focada em <b>organização, produtividade e fluidez de ideias</b>, reunindo em um só lugar a gestão de <b>notas, tarefas e projetos</b>. Com uma interface intuitiva, recursos colaborativos e o <b>MindFlow IA</b> – uma inteligência artificial integrada que funciona como um bate-papo para auxiliar o usuário, otimizar tarefas e oferecer sugestões personalizadas.
                    </p>
                </div>
                <div className="image">
                    <img src={Logo} alt="MindFlow Icon" />
                </div>
            </section>
            <section className="container" id="infos">
                <h2>Informações sobre o MindFlow</h2>
                <div className="every_infos">
                    <div className="infos">
                        <i className="bi bi-person-check"></i>
                        <h3>Experiência personalizada</h3>
                        <p>e suporte contínuo</p>
                    </div>
                    <div className="infos">
                        <i className="bi bi-cast"></i>
                        <h3>Ferramentas integradas</h3>
                        <p>para gerenciar suas tarefas</p>
                    </div>
                    <div className="infos">
                        <i className="bi bi-award"></i>
                        <h3>Soluções adaptáveis</h3>
                        <p>para equipes e empresas</p>
                    </div>
                </div>
            </section>
            <hr className="container-line"/>
            <section className="container" id="contact">
                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <h2>Contato</h2>
                    <div>
                        <label>Nome:</label>
                        <input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" required />
                    </div>
                    <div>
                        <label>Mensagem:</label>
                        <textarea name="message" required></textarea>
                    </div>
                    <button type="submit">Enviar</button>
                </form>

                <div className="contact-image">
                    <img src={ImageContact} alt="Contato" />
                </div>
            </section>
        </>
    );
}

export default Home;