import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"; // Importamos useForm
import { User, Mail, Lock, Eye, EyeOff, FileUser, BriefcaseBusiness, BookUser } from "lucide-react";
import agendar from "../../img/agendar.webp";

export function RegisterFormPsicologo() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";
  const navigate = useNavigate();

  // Reemplazamos los estados individuales con react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      username: "",
      email: "",
      password: "",
      especialidad: "",
      experiencia: "",
      licencia: ""
    }
  });

  const [mensajeError, setMensajeError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [psicologoId, setPsicologoId] = useState(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setMensajeError("");

    try {
      if (step === 1) {
        const response = await axios.post(
          `${API_URL}/funcionario/paso1`,
          { nombre: data.nombre, apellido: data.apellido }
        );
        setPsicologoId(response.data);
        setStep(2);
      } else if (step === 2) {
        const response = await axios.post(
          `${API_URL}/funcionario/paso2/${psicologoId}`,
          {
            psicologoId,
            username: data.username,
            email: data.email,
            password: data.password
          }
        );
        setStep(3);
      } else if (step === 3) {
        const response = await axios.post(
          `${API_URL}/funcionario/paso3/${psicologoId}`,
          { 
            psicologoId, 
            especialidad: data.especialidad,
            experiencia: data.experiencia,
            licencia: data.licencia
          }
        );
        alert("¡Registro completado con éxito!");
        reset(); 
        navigate("/login");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      if (error.response) {
        setMensajeError(
          error.response.data || "Correo electrónico ya registrado."
        );
      } else {
        setMensajeError("Error de conexión con el servidor.");
      }
    }
  };

  // Definimos las validaciones para cada campo
  const validaciones = {
    nombre: { required: "El nombre es obligatorio" },
    apellido: { required: "El apellido es obligatorio" },
    username: { 
      required: "El usuario es obligatorio",
      minLength: { value: 4, message: "Mínimo 4 caracteres" }
    },
    email: { 
      required: "El email es obligatorio",
      pattern: { 
        value: /^\S+@\S+\.\S+$/,
        message: "Email no válido"
      }
    },
    password: {
      required: "La contraseña es obligatoria",
      minLength: { value: 6, message: "Mínimo 6 caracteres" }
    },
    especialidad: { required: "La especialidad es obligatoria" },
    experiencia: { required: "La experiencia es obligatoria" },
    licencia: { required: "La licencia es obligatoria" }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        {/* Formulario */}
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          {/* Indicador de pasos */}
          <div className="flex items-center justify-center mb-8 space-x-2">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors ${
                      step >= num
                        ? "border-[#5603AD] bg-[#5603AD] text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {num}
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium ${
                      step >= num ? "text-[#5603AD]" : "text-gray-400"
                    }`}
                  >
                    {num === 1 ? "Personal" : num === 2 ? "Cuenta" : "Perfil"}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step > num ? "bg-[#5603AD]" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <h4 className="text-xl font-semibold text-[#5603AD]">Focus Frame</h4>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 3
              ? "Completa tu Perfil"
              : step === 2
              ? "Registro de Usuario"
              : "Datos Personales"}
          </h2>
          <p className="text-gray-500 mb-6">
            {step === 3
              ? "Añade más detalles sobre tu perfil."
              : step === 2
              ? "Crea tu cuenta para acceder."
              : "Ingresa tu nombre y apellido."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su nombre"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.nombre ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("nombre", validaciones.nombre)}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su apellido"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.apellido ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("apellido", validaciones.apellido)}
                  />
                  {errors.apellido && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.apellido.message}
                    </p>
                  )}
                </div>
                
              </>
            )}
            {step === 2 && (
              <>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su usuario"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("username", validaciones.username)}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("email", validaciones.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    className={`w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("password", validaciones.password)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="relative">
                  <BriefcaseBusiness
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su especialidad"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.especialidad ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("especialidad", validaciones.especialidad)}
                  />
                  {errors.especialidad && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.especialidad.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <FileUser
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su experiencia"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.experiencia ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("experiencia", validaciones.experiencia)}
                  />
                  {errors.experiencia && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.experiencia.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <BookUser
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su licencia"
                    className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all ${
                      errors.licencia ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("licencia", validaciones.licencia)}
                  />
                  {errors.licencia && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.licencia.message}
                    </p>
                  )}
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="terminos"
                    required
                    className="mt-1 accent-purple-600"
                  />
                  <label htmlFor="terminos" className="text-sm text-gray-700">
                    Acepto el tratamiento de mis datos personales y sensibles
                    según la{" "}
                    <a
                      href="/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline hover:text-purple-800"
                    >
                      Política de Privacidad
                    </a>
                    .
                  </label>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-all button-primary"
            >
              {step === 3 ? "Finalizar Registro" : "Siguiente"}
            </button>
            {mensajeError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {mensajeError}
              </p>
            )}
          </form>
        </div>
        {/* Sección de imagen */}
        <div className="w-1/2 button-primary flex flex-col items-center justify-center p-10 text-white rounded-r-3xl transition-all">
          <img
            src={agendar}
            className="w-80 h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            alt="Focus Frame"
          />
          <p className="text-center text-white mt-4 text-lg">
            Con <span className="font-bold text-[#f0e1ff]">FocusFrame</span>,
            administra tu calendario, citas y archivos de cliente desde una
            interfaz unificada.
          </p>
        </div>
      </div>
    </main>
  );
}