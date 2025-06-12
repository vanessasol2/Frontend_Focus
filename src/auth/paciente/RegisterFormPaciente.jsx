import React from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import ImageSection from '../../components/ui/ImageSection/Imagen';
import agendar1 from "../../img/agendar1.jpeg";
import { useRegisterPaciente } from "../../hook/useRegisterPaciente";

export function RegisterFormPaciente() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  } = useRegisterPaciente();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          <h4 className="text-xl font-semibold text-primary-color">
            Focus Frame
          </h4>
          <h2 className="text-2xl font-bold text-gray-900">Completar Perfil</h2>
          <p className="text-gray-500 mb-6">Registra tu cuenta para acceder</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Usuario */}
            <div className="mb-6">
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
                  className={`w-full p-3 pl-12 pr-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.username
                    ? "border-red-500 bg-red-50 focus:ring-red-200"
                    : "border-gray-300 hover:border-gray-400 focus:ring-violet-300 focus:border-primary-color"
                    }`}
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Input Contraseña */}
            <div className="mb-6">
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
                  className={`w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all ${errors.password
                      ? "border-red-500 bg-red-50 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:ring-violet-300 focus:border-primary-color"
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Checkbox */}
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
              disabled={isSubmitting}
              className={`w-full button-primary text-white py-3 rounded-lg transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>

          </form>
        </div>

        {/* Sección de imagen */}
        <ImageSection image={agendar1} />
      </div>
    </main>
  );
}