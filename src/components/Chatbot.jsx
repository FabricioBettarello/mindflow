import { useState, useRef, useEffect } from "react";
import useCreateChat from "../hooks/useCreateChat.jsx";
import { HashLoader } from "react-spinners";
import Markdown from 'react-markdown';
import botImage from '/MindFlow.png';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { sendMessage, messages, loading } = useCreateChat();
  const botName = 'MindFlow IA:';

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
    setIsTyping(true);
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const chatBox = document.querySelector('.chatbot-chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const getMessageText = (msg) => {
    return typeof msg.parts[0].text === 'string'
      ? msg.parts[0].text
      : JSON.stringify(msg.parts[0].text);
  };

  return (
    <>
      <button className="chatbot-button" onClick={toggleChat}>
        {isOpen ? (
          <i className="bi bi-x"></i>
        ) : (
          <i className="bi bi-chat-fill"></i>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span id="chatbot-typed-title">MindFlow IA</span>
          </div>
          <div className="chatbot-chat-box">
            <ul className="chatbot-messages">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                const messageClass = isUser
                  ? "chatbot-message chatbot-message-user"
                  : "chatbot-message chatbot-message-bot";

                return (
                  <li key={index} className={messageClass}>
                    {!isUser && (
                      <img
                        src={botImage}
                        alt={`${botName} avatar`}
                        className="chatbot-avatar"
                      />
                    )}
                    <div className="chatbot-message-content">
                      {!isUser && (
                        <div className="chatbot-message-header">
                          <strong>{botName}</strong>
                        </div>
                      )}
                      <div className="chatbot-bubble">
                        <Markdown>{getMessageText(msg)}</Markdown>
                      </div>
                    </div>
                  </li>
                );
              })}
              {loading && (
                <li className="chatbot-loading">
                  <HashLoader color="#0084ff" />
                </li>
              )}
              <div ref={messagesEndRef} />
            </ul>
          </div>
          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Digite sua mensagem"
            />
            <button type="submit" className="chatbot-submit">
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;
