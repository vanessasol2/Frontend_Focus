import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import agendar from "../../img/agendar.webp";

export function RegisterFormPaciente() {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      aceptaTerminos: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    if (!pacienteId) {
      alert("No tienes permiso para completar el perfil");
      return;
    }

    if (!data.aceptaTerminos) {
      setMensajeError(
        "Debes aceptar los Términos y Condiciones para continuar."
      );
      return;
    }

    setMensajeError("");

    try {
      const response = await axios.post(
        `http://localhost:8081/paciente/completar-perfil/${pacienteId}`,
        {
          username: data.username,
          password: data.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Perfil completado con éxito Paciente!");
      reset();
      navigate("/login");
    } catch (error) {
      setMensajeError(
        error.response?.data || "Hubo un error al completar el perfil"
      );
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          <h4 className="text-xl font-semibold text-primary-color">Focus Frame</h4>
          <h2 className="text-2xl font-bold text-gray-900">Completar Perfil</h2>
          <p className="text-gray-500 mb-6">Registra tu cuenta para acceder</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Usuario */}
            <div className="relative">
              <label htmlFor="username" className="sr-only">
                Nombre de Usuario
              </label>
              <User
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                id="username"
                placeholder="Ingrese su nombre de usuario"
                className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none transition-all ${
                  errors.username
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-primary-color"
                }`}
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                  minLength: {
                    value: 4,
                    message: "El usuario debe tener al menos 4 caracteres",
                  },
                })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Input Contraseña */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingrese su Contraseña"
                className={`w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:outline-none transition-all ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-primary-color"
                }`}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
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

            {/* Checkbox para aceptar términos */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terminos"
                className="w-4 h-4 cursor-pointer"
                {...register("aceptaTerminos", {
                  required: "Debes aceptar los términos y condiciones",
                })}
              />
              <label htmlFor="terminos" className="text-sm text-gray-600">
                Acepto los{" "}
                <a
                  href="/terminos"
                  className="text-primary-color font-semibold hover:underline"
                >
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="/privacidad"
                  className="text-primary-color font-semibold hover:underline"
                >
                  Política de Privacidad
                </a>
                .
              </label>
            </div>
            {errors.aceptaTerminos && (
              <p className="text-red-500 text-sm">
                {errors.aceptaTerminos.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full button-primary text-white py-3 rounded-lg transition-all"
            >
              Guardar
            </button>

            {mensajeError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {mensajeError}
              </p>
            )}
          </form>
        </div>

        {/* Imagen */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-button-primary rounded-xl">
          <div className="mb-6 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={agendar}
              className="w-80 h-auto object-cover rounded-xl hover:scale-[1.02] transition-transform duration-500"
              alt="Focus Frame"
            />
          </div>
          <div className="text-center max-w-xs">
            <p className="text-white text-base leading-relaxed">
              Con{" "}
              <span className="font-semibold text-secundary-color">
                FocusFrame
              </span>
              administra tu calendario, citas y archivos de tu paciente desde una interfaz unificada.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
