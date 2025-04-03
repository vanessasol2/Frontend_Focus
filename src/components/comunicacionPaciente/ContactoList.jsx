import React from "react";
import { Search } from "lucide-react";

const ContactoList = ({ contacts, selectedContact, setSelectedContact }) => {
  return (
    <section className="md:col-span-1 bg-white shadow-lg rounded-xl p-4 overflow-hidden">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Contactos</h2>

      {/* Barra de búsqueda */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar contacto"
          className="w-full p-2 border rounded-lg focus:outline-none pr-8"
        />
        <Search className="absolute right-3 top-3 text-gray-400" />
      </div>

      {/* Lista de contactos */}
      <ul className="space-y-3">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition text-gray-800 bg-[#F5F2FA] hover:bg-[#E6E1FA] 
            ${selectedContact?.id === contact.id ? "border-2 border-[#8367C7]" : ""}`}
          >
            <div className="relative min-w-12">
              <img
                src="https://images.pexels.com/photos/31093995/pexels-photo-31093995/free-photo-of-smiling-woman-in-stylish-restaurant-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={contact.name}
                className="w-12 h-12 object-cover rounded-full border border-gray-300"
              />
              {contact.status === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
              )}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{contact.time}</span>
              <div className="w-5 h-5 bg-[#8367C7] text-white text-xs font-semibold flex items-center justify-center rounded-full mt-1">
                2
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContactoList;
