"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useState, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Procuro's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Our predictive intelligence can help forecast your procurement needs.",
        "We analyze historical data and market trends to provide accurate recommendations.",
        "Would you like to see a demo of our platform?",
        "Our AI can reduce procurement costs by up to 30%.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-96 h-96 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Procuro Assistant</h3>
                <p className="text-xs opacity-80">Always here to help</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-orange-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-orange-50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-1"
                >
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0,
                      }}
                      className="w-2 h-2 bg-orange-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.1,
                      }}
                      className="w-2 h-2 bg-orange-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
