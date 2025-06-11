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

export const getPacientesPaginados = async (page = 0, size = 8, sort = 'nombrePaciente') => {
  try {
    const response = await api.get(`funcionario/pacientes`, {
      params: {
        page,
        size,
        sort
      }
    });
    
    return {
      pacientes: response.data.content.map(transformarPaciente),
      paginacion: {
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        currentPage: response.data.number,
        pageSize: response.data.size,
        isFirst: response.data.first,
        isLast: response.data.last
      }
    };
  } catch (error) {
    console.error('Error al cargar pacientes:', error);
    throw error;
  }
};

const transformarPaciente = (paciente, index) => {
  const progresoCalculado = paciente.sesionesTotales > 0 
    ? Math.round((paciente.sesionesCompletadas / paciente.sesionesTotales) * 100)
    : 0;

  return {
    id: paciente.id || `temp-${index}-${Date.now()}`,
    nombrePaciente: paciente.nombrePaciente || `Paciente ${index + 1}`,
    email: paciente.email || '',
    estado: Boolean(paciente.estado),
    progreso: paciente.porcentajeTerapia ?? progresoCalculado,
    sesionesTotales: paciente.sesionesTotales || 0,
    sesionesCompletadas: paciente.sesionesCompletadas || 0,
    fechaCreacionHistorial: paciente.fechaCreacionHistorial, 
    ultimaVisita: formatearFecha(paciente.fechaCreacionHistorial),
    tieneCitasPendientes: Boolean(paciente.tieneCitasPendientes),
    telefono: formatTelefono(paciente.telefono),
    idHistorialClinico: paciente.idHistorialClinico || null,
    nombreTerapia: paciente.nombreTerapia || null,
    valido: !!(paciente.nombrePaciente && paciente.email) 
  };
};

const formatearFecha = (fecha) => {
  if (!fecha) return 'No registrada';
  
  try {
    const date = typeof fecha === 'number' ? new Date(fecha) : new Date(fecha);
    
    if (isNaN(date.getTime())) return 'Fecha inválida';
    

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`; 
  } catch (error) {
    console.error('Error al formatear fecha:', fecha, error);
    return 'Fecha inválida';
  }
};

const formatTelefono = (telefono) => {
  if (!telefono && telefono !== 0) return 'Sin teléfono';
  
  const telString = String(telefono).replace(/\D/g, '');
  
  if (telString.length === 10) {
    return `${telString.slice(0, 3)} ${telString.slice(3, 6)} ${telString.slice(6)}`;
  }
  
  return telString; 
};

export const buscarPacientes = async (termino) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`paciente/buscarPaciente?busqueda=${encodeURIComponent(termino)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};