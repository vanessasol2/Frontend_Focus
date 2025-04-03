import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatBox = ({ selectedContact, messages, newMessage, setNewMessage }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <section className="md:col-span-3 bg-white shadow-lg rounded-xl flex flex-col">
      {selectedContact ? (
        <>
          <header className="p-4 bg-[#f3f0ff] border-b flex items-center rounded-t-xl">
            <h2 className="text-lg font-medium">{selectedContact.name}</h2>
          </header>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sentByUser ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow-md ${
                    message.sentByUser ? "bg-[#8367C7] text-white" : "bg-[#F5F2FA]"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs text-gray-400 block mt-1">{message.time}</span>
                </div>
              </div>
            ))}
          </div>

          <footer className="p-4 border-t flex items-center bg-white rounded-b-xl">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border rounded-lg focus:outline-none"
            />
            <button className="ml-2 bg-[#6D3DBD] text-white p-3 rounded-full hover:bg-[#8350E8] transition">
              <Send />
            </button>
          </footer>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Selecciona un contacto para empezar a chatear</p>
        </div>
      )}
    </section>
  );
};

export default ChatBox;
