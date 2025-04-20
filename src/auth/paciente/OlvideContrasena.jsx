import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export function OlvideContrasena() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (datos) => {
    setCargando(true);
    try {
      await axios.post("http://localhost:8081/auth/olvido-contrasena", {
        email: datos.email
      });
      setExito(true);
    } catch (error) {
      console.error("Error al solicitar recuperación:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#5603AD] mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al inicio de sesión
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Recuperar contraseña
        </h2>
        <p className="text-gray-600 mb-6">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {exito ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            ¡Listo! Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <Mail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="email"
                type="email"
                placeholder="Ingrese su correo electrónico"
                className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none transition-all
                  ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#5603AD]"} // <-- Cambiado a errors
                `}
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El formato del correo no es válido"
                  }
                })}
              />
              {errors.email && ( 
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-all button-primary"
              disabled={cargando}
            >
              {cargando ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}