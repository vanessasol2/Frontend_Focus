import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json"
  }
});

export const historialClinicoService = {
 
  crearHistorial: async (pacienteId, data, token) => {
    try {
      const response = await api.post(
        `/historialClinico/crearHistorial/${pacienteId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("Error en historialClinicoService:", error);
      
      const serviceError = new Error(
        error.response?.data?.message || 
        "Error al crear el historial clínico"
      );
      serviceError.status = error.response?.status;
      
      throw serviceError;
    }
  }
};