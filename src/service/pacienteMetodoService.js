import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json"
  }
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const pacienteMetodoService = {
  registrarPaciente: async (datosPaciente) => {
    try {
      console.log("Datos enviados al registrar:", datosPaciente);
      const response = await api.post("/paciente/registrar", datosPaciente);
      console.log("Respuesta del servidor:", response.data);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      const serviceError = new Error(
        error.response?.data?.message || 
        "Error al registrar el paciente"
      );
      serviceError.status = error.response?.status;
      serviceError.data = error.response?.data;
      throw serviceError;
    }
  },

  getHistorialPaciente: async (pacienteId) => {
    try {
      const response = await api.get(`/historialClinico/consultarHistorial/${pacienteId}`);
      console.log("Respuesta completa de la API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener historial:", error);
      const serviceError = new Error(
        error.response?.data?.message || 
        'Error al obtener el historial del paciente'
      );
      serviceError.status = error.response?.status;
      throw serviceError;
    }
  }
};

export const getPacientesCard = async () => {
  try {
    console.log("[DEBUG] Realizando petición a /funcionario/pacientes");
    const response = await api.get('funcionario/pacientes'); 
    console.log("Respuesta cruda de la API:", response); 
    
    if (!Array.isArray(response.data)) {
      console.warn('La respuesta no contiene array de pacientes:', response.data);
      return [];
    }

    return response.data.map(transformarPaciente);
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error al cargar pacientes:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(`Error al cargar pacientes: ${errorMessage}`);
  }
};

const transformarPaciente = (paciente, index) => {
  
  const tieneDatosBasicos = paciente.nombrePaciente && paciente.email;
  
  return {
    id: paciente.id || `temp-${index}-${Date.now()}`,
    nombre: paciente.nombrePaciente || `Paciente ${index + 1}`,
    correo: paciente.email || '',
    estado: paciente.estado === true ? 'inactivo' : 'activo', 
    progreso: Math.min(100, Math.max(0, Number(paciente.porcentajeTerapia) || 0)), 
    sesionesTotales: Math.max(0, Number(paciente.sesionesTotales) || 0),
    sesionesCompletadas: Math.max(0, Number(paciente.sesionesCompletadas) || 0),
    ultimaVisita: formatearFecha(paciente.fechaCreacionHistorial),
    tieneCitasPendientes: Boolean(paciente.tieneCitasPendientes), 
    telefono: formatTelefono(paciente.telefono),
    valido: tieneDatosBasicos 
  };
};

const formatearFecha = (fecha) => {
  if (!fecha) return 'No registrada';
  
  try {
    const date = new Date(fecha);
    return isNaN(date.getTime()) 
      ? 'Fecha inválida' 
      : date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
  } catch (error) {
    console.error('Error al formatear fecha:', fecha, error);
    return 'Fecha inválida';
  }
};

const formatTelefono = (telefono) => {
  if (!telefono) return '';
  const telString = String(telefono).replace(/\D/g, '');
  return telString.length > 6 
    ? `${telString.slice(0, 3)}-${telString.slice(3, 6)}-${telString.slice(6)}` 
    : telString;
};
