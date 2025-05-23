import React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import useLogin from "../../hook/useLogin";
import ImageSection from '../../components/ui/ImageSection/Imagen';
import agendar1 from "../../img/agendar1.jpeg";

export function LoginFormPaciente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const { loading, error, handleLogin } = useLogin();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    await handleLogin(data);
    if (error) {
      setError("root", { message: error });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h4 className="text-xl font-semibold text-primary-color">
            Focus Frame
          </h4>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Bienvenidos!
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Input Email */}
            <div>
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
                  className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all
                    ${errors.email
                      ? "border-red-500 bg-red-50 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:border-primary-color "
                    }
                  `}
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "El formato del correo no es válido",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 ml-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Input Contraseña */}
            <div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all
                    ${errors.password
                      ? "border-red-500 bg-red-50 focus:ring-red-200"
                      : "border-gray-300 hover:border-gray-400 focus:border-primary-color "
                    }
                  `}
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
              </div>
              {errors.password && (
                <p className="mt-1 ml-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Recordarme */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600 text-sm py-3">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="mr-2"
                />
                Recordarme
              </label>
              <a
                href="/olvide-contrasena"
                className="text-sm text-primary-color font-semibold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-all button-primary"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>

            {errors.root && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errors.root.message}
              </p>
            )}
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            © {new Date().getFullYear()} FocusFrame. Todos los derechos
            reservados.
          </p>
        </div>

        {/* Sección de imagen */}
        <ImageSection image={agendar1} />
      </div>
    </main>
  );
}