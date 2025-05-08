import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Lock, ArrowLeft } from "lucide-react";
import { Toaster, toast } from "sonner";
import { getBackendMessage } from "../../utils/errorMessages";

const RestablecerContrasena = () => {
  const [searchParams] = useSearchParams();
  const [tokenValido, setTokenValido] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const token = searchParams.get("token");

  useEffect(() => {
    const validarToken = async () => {
      try {
        if (!token) {
          throw new Error("No se encontró el token de recuperación");
        }

        const response = await axios.get(
          `http://localhost:8081/auth/validate-reset-token`,
          {
            params: { token },
            timeout: 5000,
          }
        );

        if (!response.data?.valid) {
          throw new Error(
            response.data?.message ||
              "El enlace de recuperación no es válido o ha expirado"
          );
        }

        setTokenValido(true);
      } catch (error) {
        console.error("Error al validar token:", error);
        const errorMsg = getBackendMessage(error);
        toast.error(errorMsg);
        setTokenValido(false);
      } finally {
        setCargando(false);
      }
    };

    validarToken();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      setCargando(true);

      const response = await axios.post(
        `http://localhost:8081/auth/recuperar-contrasena`,
        {
          nueva: data.nuevaContrasena,
          confirmar: data.confirmarContrasena,
        },
        {
          params: { token },
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );

      if (response.status === 200) {
        toast.success("¡Contraseña actualizada correctamente! Redirigiendo...");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      const errorMessage = getBackendMessage(error);
      toast.error(errorMessage);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Validando enlace de recuperación
        </h2>

        <div role="status" className="flex justify-center items-center space-x-4">
          <svg
            aria-hidden="true"
            className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Cargando...</span>
        </div>

        <p className="mt-4 text-gray-600">Por favor espere mientras validamos tu enlace de recuperación...</p>
      </div>
    </div>
    );
  }

  if (!tokenValido) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-7 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-primary-color mb-4">
            Error
          </h2>
          <p className="text-gray-700 mb-4">
            El enlace no es válido o ha expirado
          </p>
          <button
            onClick={() => navigate("/olvide-contrasena")}
            className="w-full px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secundary-color transition-colors 
            focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            Solicitar nuevo enlace
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-content-bg to-content-bg p-4">
      {/* Alerta*/}
      <Toaster position="top-center" richColors />

      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 mx-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-color hover:text-secundary-color mb-6 transition-colors 
          focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 rounded-lg p-1"
          aria-label="Volver"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto bg-primary-color/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Lock size={24} className="text-primary-color" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Restablecer contraseña
          </h1>
          <p className="text-gray-600">
            Crea una nueva contraseña segura para tu cuenta.
          </p>
        </div>

        {/* Formulario*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="nuevaContrasena"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nueva contraseña
            </label>
            <input
              id="nuevaContrasena"
              type="password"
              placeholder="Escribe tu nueva contraseña"
              className={`block w-full px-4 py-3 border ${
                errors.nuevaContrasena
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-primary-color focus:border-primary-color"
              } rounded-lg shadow-sm`}
              {...register("nuevaContrasena", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Debe incluir mayúsculas, minúsculas y números",
                },
              })}
            />
            {errors.nuevaContrasena && (
              <p className="mt-2 text-sm text-red-600">
                {errors.nuevaContrasena.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmarContrasena"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmarContrasena"
              type="password"
              placeholder="Confirma tu nueva contraseña"
              className={`block w-full px-4 py-3 border ${
                errors.confirmarContrasena
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-primary-color focus:border-primary-color"
              } rounded-lg shadow-sm`}
              {...register("confirmarContrasena", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === watch("nuevaContrasena") ||
                  "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmarContrasena && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmarContrasena.message}
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
              } focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary-color transition-colors duration-200`}
            >
              {cargando ? (
                <>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600 mx-auto"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Cargando...</span>
                  </div>
                </>
              ) : (
                "Cambiar contraseña"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ¿Ya tienes tu contraseña?{" "}
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
};

export default RestablecerContrasena;
