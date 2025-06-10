import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const crearSesion = async (sesionData) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
    const response = await axios.post(`${API_URL}/sesion/psicologo`, sesionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear la sesión:", error);
    throw error;
  }
};


export const crearTerapia = async (terapiaData) => {
const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const response = await axios.post(`${API_URL}/terapia/crear`, terapiaData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
