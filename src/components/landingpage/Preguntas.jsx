import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    { question: "¿Qué es FocusFrame?", answer: "Es una plataforma diseñada para psicólogos..." },
    { question: "¿Cómo puedo empezar a usar FocusFrame?", answer: "Puedes registrarte y seguir el proceso guiado..." },
    { question: "¿Es segura la información?", answer: "Sí, usamos encriptación avanzada para proteger los datos..." },
];

export default function Preguntas() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-16 bg-[#faf7ff] text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
            <div className="bg-white shadow-lg rounded-2xl p-6">
                {faqs.map((faq, index) => (
                    <div key={index} className={`border-b last:border-none transition-all ${openIndex === index ? "bg-[#f3f0ff]" : ""}`}>
                        <button onClick={() => setOpenIndex(index === openIndex ? -1 : index)} className="w-full text-left py-4 flex justify-between text-gray-800 font-semibold">
                            {faq.question}
                            <ChevronDown size={20} className={`transition-transform ${openIndex === index ? "rotate-180 text-[#7e22ce]" : "text-gray-500"}`} />
                        </button>
                        {openIndex === index && <p className="px-6 pb-4 text-sm text-gray-600">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
}
