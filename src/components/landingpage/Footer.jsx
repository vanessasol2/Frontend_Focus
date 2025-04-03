import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#5603AD] text-white py-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                {/* Sección de Información */}
                <div>
                    <h3 className="text-xl font-bold mb-4">FocusFrame</h3>
                    <p className="text-gray-300 text-sm">
                        Simplificando la gestión de tu práctica con tecnología avanzada,
                        permitiéndote centrarte en lo que importa: tus pacientes.
                    </p>
                </div>

                {/* Enlaces Rápidos */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Enlaces</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#inicio" className="hover:text-gray-300">Inicio</a></li>
                        <li><a href="#funciones" className="hover:text-gray-300">Funciones</a></li>
                        <li><a href="#nosotros" className="hover:text-gray-300">Nosotros</a></li>
                        <li><a href="#servicios" className="hover:text-gray-300">Servicios</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contacto</a></li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Síguenos</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
                        <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm text-gray-400">
                © 2025 FocusFrame. Todos los derechos reservados.
            </div>
        </footer>
    );
}
