import { Routes, Route } from "react-router-dom";
import { LoginFormPaciente } from "./auth/paciente/LoginFormPaciente";
import { RegisterFormPaciente } from "./auth/paciente/RegisterFormPaciente";
import { RegisterFormPsicologo } from "./auth/psicologo/RegisterFormPsicologo";
import HomePaciente from "./pages/patient/HomePaciente"
import CitasPaciente from "./pages/patient/CitasPaciente";
import PagosPaciente from "./pages/patient/PagosPaciente";
import HistorialPaciente from "./pages/patient/HistorialPaciente";
import ComunicacionPaciente from "./pages/patient/ComunicacionPaciente";
import ProtectedRoute from "./routes/ProtectedRoute";
import FocusFrameLandingPage from "./pages/focusFrameLandingPage/FocusFrameLandingPage"
import HomePsicologo from "./pages/psicologo/HomePsicologo"
import Pacientes from "./pages/psicologo/Pacientes"
import CitasPsicologo from "./pages/psicologo/CitasPsicologo";

function App() {
  return (
    <Routes>
      {/* Ruta de la Landing Page */}
      <Route path="/" element={<FocusFrameLandingPage />} />

      {/* Rutas públicas */}
      <Route path="/login" element={<LoginFormPaciente />} />
      <Route path="/register/:pacienteId" element={<RegisterFormPaciente />} />
      <Route path="/register-psicologo" element={<RegisterFormPsicologo />} />

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
    </Routes>
  );
}

export default App;
