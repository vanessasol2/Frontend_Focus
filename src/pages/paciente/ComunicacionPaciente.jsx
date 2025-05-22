import React, { useState } from "react";
import MainLayout from "../../layout/paciente/MainLayout";
import ContactoList from "../../components/comunicacionPaciente/ContactoList";
import ChatBox from "../../components/comunicacionPaciente/ChatBox";

const ComunicacionPaciente = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const contacts = [
    { id: 1, name: "Sara Mateus", lastMessage: "Buenas tardes doctor...", status: "online", time: "15min" },
    { id: 2, name: "Juan Pablo", lastMessage: "Encantado de verte ayer.", status: "offline", time: "1h" },
    { id: 3, name: "Pedro Julio", lastMessage: "Hola, ¿cómo estás?", status: "online", time: "5min" },
  ];

  const messages = [
    { sender: "Sara Mateus", text: "Hola, doctor, ¿cómo está?", time: "12:30", sentByUser: false },
    { sender: "Tú", text: "Hola, Sara. Estoy bien, gracias. ¿En qué puedo ayudarte?", time: "12:31", sentByUser: true },
    { sender: "Sara Mateus", text: "Quería confirmar nuestra cita para la próxima semana.", time: "12:33", sentByUser: false },
    { sender: "Tú", text: "Claro que sí, está confirmada. ¿Algo más?", time: "12:35", sentByUser: true },
  ];

  return (
    <MainLayout>
      <main className="h-screen md:h-[90vh] grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 mt-8">
        <ContactoList contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        <ChatBox selectedContact={selectedContact} messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} />
      </main>
    </MainLayout>
  );
};

export default ComunicacionPaciente;
