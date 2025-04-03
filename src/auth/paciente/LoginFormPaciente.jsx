import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import agendar from "../../img/agendar.webp";

export function LoginFormPaciente() {
  const [mensajeError, setMensajeError] = useState("");
  const [password, setPasswordValue] = useState("");
  const [email, setEmailValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPasswordValue(e.target.value);
  const handleEmailChange = (e) => setEmailValue(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Datos enviados: ", email, password);

    const data = { email, password };

    try {
      const response = await axios.post("http://localhost:8081/auth/login", data);

      if (response.data && response.data.token) {
        const token = response.data.token;

        
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);

        
        const roles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
        console.log("Roles extraídos:", roles);

        const user = { email };

        dispatch(login({ user, role: roles, token }));

        alert("Login exitoso");

       
        if (roles.includes("PACIENTE")) {
          console.log("Redirigiendo a home-paciente");
          navigate("/home-paciente");
        } else if (roles.includes("PSICOLOGO")) {
          console.log("Redirigiendo a home-psicologo");
          navigate("/home-psicologo");
        } else {
          console.error("Rol desconocido:", roles);
          setMensajeError("Acceso denegado. Rol no reconocido.");
        }
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setMensajeError("Usuario o contraseña incorrectos");
        } else if (error.response.status === 500) {
          setMensajeError("Error");
        }
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        {/* FORMULARIO */}
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          <h4 className="text-xl font-semibold text-[#5603AD]">Focus Frame</h4>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Bienvenidos!</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Input Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all"
              />
            </div>

            {/* Input Contraseña */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full p-3 pl-12 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#5603AD] focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Recordarme y Olvidé mi contraseña */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600 text-sm py-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-sm text-[#5603AD] font-semibold hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Login */}
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-all button-primary"
            >
              Iniciar Sesión
            </button>

            {/* Mensaje de error */}
            {mensajeError && <p className="text-red-500 text-sm text-center mt-2">{mensajeError}</p>}
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            © {new Date().getFullYear()} FocusFrame. Todos los derechos reservados.
          </p>
        </div>

        {/* IMAGEN */}
        <div className="w-1/2 button-primary flex flex-col items-center justify-center p-10 text-white rounded-r-3xl transition-all">
          <img
            src={agendar}
            className="w-80 h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            alt="Focus Frame"
          />
          <p className="text-center text-white mt-4 text-lg">
            Con <span className="font-bold text-[#f0e1ff]">FocusFrame</span>, administra tu calendario, citas y archivos de cliente desde una interfaz unificada.
          </p>
        </div>
      </div>
    </main>
  );
}
