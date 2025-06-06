import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  }
});

export const psicologoService = {
 
  registrarPaso1: async (data) => {
    try {
      const response = await api.post("/funcionario/paso1", {
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim()
      });
      
      if (!response.data?.idFuncionario) {
        throw new Error("No se recibió el ID del funcionario");
      }
      
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  },

 
  registrarPaso2: async (id, data) => {
    try {
      const response = await api.post(`/funcionario/paso2/${id}`, {
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password,
        tipoDoc: data.tipoDoc,
        fechaNacimiento: data.fechaNacimiento,
        documento: data.documento
      });
      
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  },

 
  registrarPaso3: async (id, data) => {
    try {
      const response = await api.post(`/funcionario/paso3/${id}`, {
        especialidad: data.especialidad.trim(),
        experiencia: data.experiencia.trim(),
        licencia: data.licencia.trim()
      });
      
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  }
};