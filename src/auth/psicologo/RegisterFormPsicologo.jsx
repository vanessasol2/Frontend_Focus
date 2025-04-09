import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, FileUser, BriefcaseBusiness, BookUser } from "lucide-react";
import agendar from "../../img/agendar.webp";

export function RegisterFormPsicologo() {

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";
    const navigate = useNavigate();

    const [mensajeError, setMensajeError] = useState("");
    const [personal, setPersonal] = useState({
        nombre: "",
        apellido: "",
    });
    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [perfil, setPerfil] = useState({
        especialidad: "",
        experiencia: "",
        licencia: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [psicologoId, setPsicologoId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (step === 1) setPersonal({ ...personal, [name]: value });
        else if (step === 2) setRegister({ ...register, [name]: value });
        else setPerfil({ ...perfil, [name]: value });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleRegister = async (e) => {
        e.preventDefault();
        setMensajeError("");

        try {
            if (step === 1) {
                const response = await axios.post(`${API_URL}/funcionario/paso1`, personal);
                console.log("Respuesta completa del backend:", response);
                console.log("Paso 1 Response:", response.data);
                setPsicologoId(response.data);
                setStep(2)
            }

            else if (step === 2) {
                const response = await axios.post(`${API_URL}/funcionario/paso2/${psicologoId}`, {
                    psicologoId,
                    ...register,
                });

                console.log("Paso 2 Response:", response.data);
                setStep(3);
            }

            else if (step === 3) {
                const response = await axios.post(`${API_URL}/funcionario/paso3/${psicologoId}`, { psicologoId, ...perfil });
                console.log("Paso 3 Response:", response.data);

                alert("Registro completo con éxito!");
                navigate("/login");
            }

        } catch (error) {
            console.error("Error en el registro:", error);

            if (error.response) {
                if (error.response.status === 400) {
                    setMensajeError(error.response.data || "Correo electrónico ya registrado.");
                }
            } else {
                setMensajeError("Error de conexión con el servidor.");
            }
        }
    };


    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
                {/* Formulario */}
                <div className="w-1/2 p-10 flex flex-col justify-center h-full">
                    {/* Indicador de pasos */}
                    <div className="flex items-center justify-center mb-6">
                        {[1, 2, 3].map((num) => (
                            <React.Fragment key={num}>
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${step >= num ? "bg-[#5603AD]" : "bg-gray-300"}`}>
                                    {num}
                                </div>
                                {num < 3 && <div className="w-12 h-1 bg-gray-300 mx-2"></div>}
                            </React.Fragment>
                        ))}
                    </div>

                    <h4 className="text-xl font-semibold text-[#5603AD]">Focus Frame</h4>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {step === 3 ? "Completa tu Perfil" : step === 2 ? "Registro de Usuario" : "Datos Personales"}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        {step === 3 ? "Añade más detalles sobre tu perfil." : step === 2 ? "Crea tu cuenta para acceder." : "Ingresa tu nombre y apellido."}
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {step === 1 && (
                            <>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={personal.nombre}
                                        onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="apellido"
                                        placeholder="Apellido"
                                        value={personal.apellido}
                                        onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Usuario"
                                        value={register.username}
                                        onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        value={register.email} onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Contraseña"
                                        value={register.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all"
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className="relative">
                                    <BriefcaseBusiness className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="especialidad"
                                        placeholder="Especialidad"
                                        value={perfil.especialidad}
                                        onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                                <div className="relative">
                                    <FileUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="experiencia"
                                        placeholder="experiencia"
                                        value={perfil.experiencia}
                                        onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                                <div className="relative">
                                    <BookUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="licencia"
                                        placeholder="Licencia"
                                        value={perfil.licencia}
                                        onChange={handleChange} required
                                        className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all" />
                                </div>
                            </>
                        )}
                        <button type="submit" className="w-full text-white py-3 rounded-lg transition-all button-primary">
                            {step === 3 ? "Finalizar Registro" : "Siguiente"}
                        </button>
                        {mensajeError && <p className="text-red-500 text-sm text-center mt-2">{mensajeError}</p>}
                    </form>
                </div>
                <div className="w-1/2 button-primary flex flex-col items-center justify-center p-10 text-white rounded-r-3xl transition-all">
                    <img src={agendar} className="w-80 h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform" alt="Focus Frame" />
                    <p className="text-center text-white mt-4 text-lg">
                        Con <span className="font-bold text-[#f0e1ff]">FocusFrame</span>, administra tu calendario, citas y archivos de cliente desde una interfaz unificada.
                    </p>
                </div>
            </div>
        </main>
    );
}