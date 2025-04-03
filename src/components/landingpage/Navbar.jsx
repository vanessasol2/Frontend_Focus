import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center p-6">
            <div className="flex items-center gap-2">
                <img className="h-10 w-10" src={logo} alt="logo" />
                <h1 className="text-lg font-bold text-[#5603AD]">FOCUSFRAME</h1>
            </div>
            <div className="space-x-6">
                <a href="#inicio" className="text-gray-700">Inicio</a>
                <a href="#funciones" className="text-gray-700">Funciones</a>
                <a href="#nosotros" className="text-gray-700">Nosotros</a>
                <a href="#servicios" className="text-gray-700">Servicios</a>
                <button onClick={() => navigate("/register-psicologo")} className="border border-[#5603AD] py-2 px-4 text-[#5603AD] rounded-md hover:bg-[#5603AD] hover:text-white">Regístrate</button>
                <button onClick={() => navigate("/login")} className="py-2 px-4 text-white bg-[#5603AD] rounded-lg hover:bg-[#47038C]">Iniciar sesión</button>
            </div>
        </nav>
    );
}
