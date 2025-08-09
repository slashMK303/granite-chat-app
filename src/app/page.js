'use client';

import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showReadme, setShowReadme] = useState(false);

  useEffect(() => {
    const storedConvos = localStorage.getItem('conversations');
    if (storedConvos) {
      setConversations(JSON.parse(storedConvos));
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const handleNewChat = () => {
    const newId = Date.now().toString();
    setActiveConversationId(newId);
    setCurrentMessages([]);
    setError(null);
  };

  const handleSelectChat = (id) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setActiveConversationId(id);
      setCurrentMessages(conversation.messages);
      setError(null);
    }
  };

  const handleDeleteChat = (id) => {
    const updatedConvos = conversations.filter(c => c.id !== id);
    setConversations(updatedConvos);
    if (activeConversationId === id) {
      handleNewChat();
    }
    if (updatedConvos.length === 0) {
      localStorage.removeItem('conversations');
    }
  };

  const handleSubmit = async (prompt) => {
    if (!prompt) return;

    setIsLoading(true);
    setError(null);

    const userMessage = { role: 'user', content: prompt };
    const updatedMessages = [...currentMessages, userMessage];
    setCurrentMessages(updatedMessages);

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        min_tokens: settings.min_token,
        max_tokens: settings.max_token,
        temperature: settings.temperature,
        top_p: 1
      }),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      setIsLoading(false);
      return;
    }

    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await sleep(1000);
      const pollResponse = await fetch("/api/predictions/" + prediction.id);
      prediction = await pollResponse.json();
      if (pollResponse.status !== 200) {
        setError(prediction.detail);
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);

    if (prediction.status === "succeeded") {
      const aiMessage = { role: 'ai', content: prediction.output.join("") };
      const finalMessages = [...updatedMessages, aiMessage];

      setCurrentMessages(finalMessages);

      const convoIndex = conversations.findIndex(c => c.id === activeConversationId);
      if (convoIndex > -1) {
        const updatedConvos = [...conversations];
        updatedConvos[convoIndex].messages = finalMessages;
        setConversations(updatedConvos);
      } else {
        const newConversation = {
          id: activeConversationId || Date.now().toString(),
          title: prompt.substring(0, 30) + "...",
          messages: finalMessages,
        };
        setActiveConversationId(newConversation.id);
        setConversations([newConversation, ...conversations]);
      }
    } else {
      setError(prediction.error || "An unknown error occurred.");
    }
  };

  const [settings, setSettings] = useState({
    min_token: 0,
    max_token: 512,
    temperature: 0.6,
  });

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <Sidebar
        conversations={conversations}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        activeConversationId={activeConversationId}
      />
      <div className="flex flex-col flex-1 min-w-0 h-screen">
        <Navbar
          settings={settings}
          setSettings={setSettings}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          showReadme={showReadme}
          setShowReadme={setShowReadme}
        />
        <div className="flex flex-col flex-1 min-h-0 mt-20">
          <ChatArea
            messages={currentMessages}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            onShowSettings={() => setShowSettings(true)}
            onShowReadme={() => setShowReadme(true)}
          />
        </div>
      </div>
    </div>
  );
}