import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import usePasswordReset from "../../hook/usePasswordReset";

export function OlvideContrasena() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { loading, handlePasswordReset, navigate } = usePasswordReset();

  const onSubmit = async (data) => {
    await handlePasswordReset(data.email);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-content-bg to-content-bg p-4">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all ${
                  errors.email
                    ? "border-red-500 bg-red-50 focus:ring-red-200"
                    : "border-gray-300 hover:border-gray-400 focus:border-primary-color "
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
              disabled={!isValid || loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                !isValid || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-color hover:bg-secundary-color"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition-colors duration-200`}
            >
              {loading ? (
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