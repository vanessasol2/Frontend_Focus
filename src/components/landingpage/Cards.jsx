import { MessageSquare, Repeat, Lock, Calendar } from "lucide-react";
import { useState } from "react";

const features = [
    { title: "Comunicación Segura con Pacientes", description: "Mantén conversaciones privadas y seguras...", icon: <MessageSquare size={28} className="text-[#5603AD]" /> },
    { title: "Intercambio de Recursos", description: "Comparte guías, ejercicios y cualquier recurso útil...", icon: <Repeat size={28} className="text-[#5603AD]" /> },
    { title: "Confidencialidad de la Información", description: "Toda la información proporcionada se almacena de forma segura...", icon: <Lock size={28} className="text-[#5603AD]" /> },
    { title: "Agendamiento rápido y efectivo", description: "Permite a tus pacientes programar citas fácilmente...", icon: <Calendar size={28} className="text-[#5603AD]" /> },
];

export default function Cards() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="funciones" className="py-12">
            <h3 className="text-3xl font-bold text-[#404040] text-center mb-6">Funcionalidades</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <div key={index} onClick={() => setActiveIndex(index)} className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${activeIndex === index ? "bg-[#5603AD] text-white" : "bg-[#f3f0ff] text-[#404040]"}`}>
                        <div className="flex flex-col items-center mb-4">
                            {feature.icon}
                            <h4 className="text-xl font-bold mt-2">{feature.title}</h4>
                        </div>
                        {activeIndex === index && <p className="text-sm mt-2">{feature.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
}

