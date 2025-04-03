import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="rounded-lg p-4 mb-4 shadow-md bg-[#f3f0ff]">
      {/* Botón del Acordeón */}
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full items-center text-[#8350E8] font-medium text-md"
      >
        <span>{title}</span>

        {/* Ícono con animación */}
        {accordionOpen ? (
          <ChevronUp className="text-[#8350E8] transition-transform duration-300" />
        ) : (
          <ChevronDown className="text-gray-500 transition-transform duration-300" />
        )}
      </button>

      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-700 text-sm ${
          accordionOpen ? "max-h-screen opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 border-t border-[#8350E8]">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
