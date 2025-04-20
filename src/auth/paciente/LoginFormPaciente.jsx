import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useForm } from "react-hook-form"; 
import agendar from "../../img/agendar.webp";

export function LoginFormPaciente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        { email: data.email, password: data.password }
      );

      if (response.data?.token) {
        const token = response.data.token;

        
        data.rememberMe 
          ? localStorage.setItem("token", token) 
          : sessionStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const roles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
        const user = { email: data.email };

        dispatch(login({ user, role: roles, token }));

        alert("Login exitoso");

        if (roles.includes("PACIENTE")) {
          navigate("/home-paciente");
        } else if (roles.includes("PSICOLOGO")) {
          navigate("/home-psicologo");
        } else {
          setError("root", { message: "Acceso denegado. Rol no reconocido." });
        }
      } else {
        setError("root", { message: "Usuario o contraseña incorrectos." });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("root", { message: "Usuario o contraseña incorrectos" });
        } else if (error.response.status === 500) {
          setError("root", { message: "Error interno del servidor" });
        }
      } else {
        setError("root", { message: "No se pudo conectar con el servidor" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        {/* Formulario*/}
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          <h4 className="text-xl font-semibold text-[#5603AD]">Focus Frame</h4>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Bienvenidos!
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Input Email */}
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
                  ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#5603AD]"}
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
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                className={`w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:outline-none transition-all 
                  ${errors.password ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#5603AD]"}
                `}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
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
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Recordarme y Olvidé mi contraseña */}
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
                className="text-sm text-[#5603AD] font-semibold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Login */}
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-all button-primary"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>

            {/* Mensaje de error general */}
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

        {/* Imagen */}
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