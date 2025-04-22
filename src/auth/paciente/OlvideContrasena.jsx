import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { getBackendMessage } from "../../utils/errorMessages";

export function OlvideContrasena() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (datos) => {
    setCargando(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/auth/recuperarContra",
        null,
        {
          params: { email: datos.email },
          timeout: 10000 
        }
      );

      if (response.status === 200) {
        toast.success(
          <div>
            <p className="font-medium">¡Solicitud recibida!</p>
            <p className="text-sm mt-1">
              Si el correo existe en nuestro sistema, recibirás un enlace para
              restablecer tu contraseña en los próximos minutos.
            </p>
          </div>,
          {
            duration: 5000,
          }
        );
      }
    } catch (error) {
      console.error("Error al solicitar recuperación:", error);
      const errorMessage = getBackendMessage(error);
      
      toast.error(
        <div>
          <p className="font-medium">No pudimos procesar tu solicitud</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>,
        {
          duration: 5000,
          action: {
            label: 'Reintentar',
            onClick: () => handleSubmit(onSubmit)()
          }
        }
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-content-bg to-content-bg p-4">
      {/* Alerta*/}
      <Toaster position="top-center" richColors expand visibleToasts={3} />

      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 mx-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-color hover:text-secundary-color mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 rounded-lg p-1"
          aria-label="Volver al inicio de sesión"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto bg-primary-color/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Mail size={24} className="text-primary-color" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Recupera tu contraseña
          </h1>
          <p className="text-gray-600">
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </p>
        </div>

        {/* Formulario*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Input Email  */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Ingresa tu correo electronico"
                className={`block w-full pl-10 pr-3 py-3 border ${
                  errors.email
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-primary-color focus:border-primary-color"
                } rounded-lg shadow-sm`}
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo electrónico válido",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!isValid || cargando}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                !isValid || cargando
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-color hover:bg-secundary-color"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition-colors duration-200`}
            >
              {cargando ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar enlace de recuperación"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ¿Recordaste tu contraseña?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary-color hover:text-secundary-color font-medium focus:outline-none focus:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}