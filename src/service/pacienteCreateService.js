import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json"
  }
});

export const pacienteCreateService = {
  
  registrarPaciente: async (datosPaciente, token) => {
    try {
      const response = await api.post("/paciente/registrar", datosPaciente, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error("Error en pacienteService:", error);
      
      const serviceError = new Error(
        error.response?.data?.message || 
        "Error al registrar el paciente"
      );
      serviceError.status = error.response?.status;
      serviceError.data = error.response?.data;
      
      throw serviceError;
    }
  }
};