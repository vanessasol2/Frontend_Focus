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
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:8081/auth/login", {
        email: data.email,
        password: data.password,
      }, {
        withCredentials: true
      });
  
      if (response.data?.token) {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);
  
        if (data.rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
  
        const roles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
        
        const user = { 
          email: decoded.sub || data.email, 
          name: decoded.name || data.email.split('@')[0] 
        };
  
        dispatch(login({ 
          user, 
          role: roles.includes("PACIENTE") ? "PACIENTE" : "PSICOLOGO", 
          token 
        }));
  
        // Redirección basada en rol
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
        const status = error.response.status;
        const message = status === 401 ? "Usuario o contraseña incorrectos" :
                       status === 500 ? "Error interno del servidor" :
                       `Error del servidor (${status})`;
        setError("root", { message });
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
          <h4 className="text-xl font-semibold text-primary-color">
            Focus Frame
          </h4>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Bienvenidos!
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Input Email  */}
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
                  className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none transition-all
          ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-primary-color"
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
                  className={`w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:outline-none transition-all 
          ${
            errors.password
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-primary-color"
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

        {/* Imagen */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-button-primary rounded-xl transition-all duration-300 hover:shadow-lg hover:bg-button-primary/90">
          {/* Contenedor de la imagen  */}
          <figure className="mb-6 w-full max-w-xs md:max-w-sm overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500">
            <img
              src={agendar}
              className="w-full h-auto aspect-video object-cover rounded-xl hover:scale-[1.02] transition-transform duration-500"
              alt="Focus Frame - Administración de calendario y citas psciologicas"
              loading="lazy"
              width={320}
              height={180}
            />
            <figcaption className="sr-only">
              Interfaz de FocusFrame para administración psciologica
            </figcaption>
          </figure>

          {/* Contenedor de texto */}
          <div className="text-center max-w-xs md:max-w-sm">
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Con{" "}
              <span className="font-semibold text-secundary-color hover:text-secundary-color/80 transition-colors">
                FocusFrame
              </span>
              , administra tu calendario, citas y archivos de pacientes desde
              una interfaz unificada.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
