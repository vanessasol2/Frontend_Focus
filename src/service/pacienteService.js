import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081", 
  headers: {
    "Content-Type": "application/json",
  },
});

const pacienteService = {
 
  completarPerfil: async (pacienteId, data) => {
    try {
      const response = await api.post(
        `/paciente/completar-perfil/${pacienteId}`,
        data
      );
      
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error en pacienteService:", error);
      
      const serviceError = new Error(
        error.response?.data?.message || 
        error.response?.data || 
        "Hubo un error al completar el perfil"
      );
      serviceError.status = error.response?.status;
      
      throw serviceError;
    }
  },
};

export default pacienteService;