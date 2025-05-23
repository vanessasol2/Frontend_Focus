import axios from "axios";

const API_URL = "http://localhost:8081/auth";

const passwordService = {
  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(
        `${API_URL}/recuperarContra`,
        null,
        {
          params: { email },
          timeout: 10000
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

};

export default passwordService;