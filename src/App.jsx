import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/AuthSlice";
import { jwtDecode } from "jwt-decode";

//Sistema
import { LoginFormPaciente } from "./auth/paciente/LoginFormPaciente";
import { RegisterFormPaciente } from "./auth/paciente/RegisterFormPaciente";
import { RegisterFormPsicologo } from "./auth/psicologo/RegisterFormPsicologo";
import {OlvideContrasena}  from "./auth/paciente/OlvideContrasena";
import RestablecerContrasena from "./auth/paciente/RestablecerContrasena";

//Paciente
import HomePaciente from "./pages/paciente/HomePaciente";
import CitasPaciente from "./pages/paciente/CitasPaciente";
import PagosPaciente from "./pages/paciente/PagosPaciente";
import HistorialPaciente from "./pages/paciente/HistorialPaciente";
import ComunicacionPaciente from "./pages/paciente/ComunicacionPaciente";
import ProtectedRoute from "./routes/ProtectedRoute";
import FocusFrameLandingPage from "./pages/focusFrameLandingPage/FocusFrameLandingPage";
import PoliticaPrivacidad from "./auth/psicologo/PoliticaPrivacidad";

//Psicologo
import HomePsicologo from "./pages/psicologo/HomePsicologo";
import Pacientes from "./pages/psicologo/Pacientes";
import CitasPsicologo from "./pages/psicologo/CitasPsicologo";
import CrearPaciente from "./components/crearPaciente/CrearPaciente";
import CrearHistorialClinico from "./components/crearHistorialClinico/CrearHistorialClinico";
import PerfilPsicologo from "./pages/psicologo/PerfilPsicologo"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expirado");
        }

        dispatch(login({ 
          token,
          user: { 
            email: decoded.sub,
            name: decoded.name,
          },
          role: decoded.roles?.[0] || decoded.role,
        }));
      } catch (error) {
        console.error("Error inicializando autenticación:", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Ruta de la Landing Page */}
      <Route path="/" element={<FocusFrameLandingPage />} />

      {/* Rutas públicas */}
      <Route path="/login" element={<LoginFormPaciente />} />
      <Route path="/olvide-contrasena" element={<OlvideContrasena />} />
      <Route path="/auth/recuperar-contrasena" element={<RestablecerContrasena />} />
      <Route path="/register/:pacienteId" element={<RegisterFormPaciente />} />
      <Route path="/register-psicologo" element={<RegisterFormPsicologo />} />
      <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />

      {/* Rutas protegidas */}
      <Route
        path="/home-paciente"
        element={
          <ProtectedRoute allowedRoles={["PACIENTE"]}>
            <HomePaciente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citas"
        element={
          <ProtectedRoute allowedRoles={["PACIENTE"]}>
            <CitasPaciente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pagos"
        element={
          <ProtectedRoute allowedRoles={["PACIENTE"]}>
            <PagosPaciente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/historial"
        element={
          <ProtectedRoute allowedRoles={["PACIENTE"]}>
            <HistorialPaciente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comunicacion"
        element={
          <ProtectedRoute allowedRoles={["PACIENTE"]}>
            <ComunicacionPaciente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home-psicologo"
        element={
          <ProtectedRoute allowedRoles={["PSICOLOGO"]}>
            <HomePsicologo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pacientes"
        element={
          <ProtectedRoute allowedRoles={["PSICOLOGO"]}>
            <Pacientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citas-psicologo"
        element={
          <ProtectedRoute allowedRoles={["PSICOLOGO"]}>
            <CitasPsicologo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crear-paciente"
        element={
          <ProtectedRoute allowedRoles={["PSICOLOGO"]}>
            <CrearPaciente />
          </ProtectedRoute>
        }
      />
      <Route path="/historial-clinico" element={<CrearHistorialClinico/>} />

      <Route
        path="/pacientes/:pacienteId/historial"
        element={
          <ProtectedRoute allowedRoles={["PSICOLOGO"]}>
            <CrearHistorialClinico />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil-psicologo"
        element={
          <ProtectedRoute allowedRoles={["PSICOLOGO"]}>
            <PerfilPsicologo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
