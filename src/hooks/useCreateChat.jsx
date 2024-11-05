import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

const useCreateChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const generateChat = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const newChat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Seu nome é MindFlow, a avançada IA do MindFlow. O MindFlow é uma plataforma focada em organização, produtividade e fluidez de ideias. Ela permitirá aos usuários gerenciar notas, tarefas e projetos de forma integrada, promovendo a sinergia entre criatividade e execução. Ajude o usuário no que precisar.",
            },
          ],
        },
      ],
    });

    setChat(newChat);
  };

  const saveMessagesToStorage = (msgs) => {
    sessionStorage.setItem("chatMessages", JSON.stringify(msgs));
  };

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const initialMessage = {
        role: "model",
        parts: [
          {
            text: "Bem-vindo(a)! Sou o MindFlow IA. Você pode me perguntar o que quiser! O que você está precisando?",
          },
        ],
      };
      setMessages([initialMessage]);
    }

    generateChat();
  }, []);

  const sendMessage = async (message) => {
    setLoading(true);

    const userMessage = { role: "user", parts: [{ text: message }] };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessagesToStorage(updatedMessages);

    try {
      const response = await chat.sendMessage(message);
      const botMessage = {
        role: "model",
        parts: [
          {
            text: response.response.candidates[0].content.parts[0].text,
          },
        ],
      };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveMessagesToStorage(newMessages);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    messages,
    loading,
  };
};

export default useCreateChat;
