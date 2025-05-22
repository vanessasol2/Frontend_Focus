import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8081/auth";

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (!response.data?.token) {
        throw new Error("No se recibió token en la respuesta");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  decodeToken: (token) => {
    try {
      const decoded = jwtDecode(token);
      return {
        email: decoded.sub,
        name: decoded.name || decoded.sub.split('@')[0],
        roles: Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles]
      };
    } catch (error) {
      throw new Error("Error al decodificar el token");
    }
  },

  setAuthHeaders: (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  clearAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
  },

  getErrorMessage: (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return "Usuario o contraseña incorrectos";
        case 403:
          return "Acceso no autorizado";
        case 500:
          return "Error interno del servidor";
        default:
          return `Error del servidor (${error.response.status})`;
      }
    } else if (error.message.includes("Rol no reconocido")) {
      return "Acceso denegado. Rol no reconocido.";
    } else if (error.message.includes("No se recibió token")) {
      return "Error inesperado en la respuesta del servidor";
    } else if (error.request) {
      return "No se pudo conectar con el servidor";
    }
    return "Error durante el inicio de sesión";
  }
};

export default authService;