import { Play } from "lucide-react";
import dashboard from "../../img/dashboard.png";

export default function HeroSection() {
    return (
        <section id="inicio" className="relative text-center py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforma tu práctica con</h2>
            <h2 className="text-4xl font-bold text-[#5603AD] mb-4">FocusFrame</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Agiliza la programación de citas con un sistema intuitivo, permitiéndote dedicar más tiempo al cuidado de tus pacientes.
            </p>

            <button className="flex items-center gap-2 button-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6f35e0]">
                <Play size={18} /> Ver Video
            </button>

            <div className="relative flex justify-center items-center mt-10 py-9">
                <img src={dashboard} alt="FocusFrame Interface" className="w-full max-w-4xl rounded-xl shadow-lg hover:scale-105 transition-transform" />
            </div>
        </section>
    );
}
