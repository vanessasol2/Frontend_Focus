import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/AuthSlice";
import authService from "../service/authService";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const { token } = await authService.login(data.email, data.password);
      const userData = authService.decodeToken(token);
      
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      
      if (!data.rememberMe) {
        sessionStorage.setItem("token", token);
      }

      authService.setAuthHeaders(token);

      const role = userData.roles.includes("PACIENTE") ? "PACIENTE" :
        userData.roles.includes("PSICOLOGO") ? "PSICOLOGO" : null;

      if (!role) {
        throw new Error("Rol no reconocido");
      }

      dispatch(login({
        user: { email: userData.email, name: userData.name },
        role,
        token
      }));

      const redirectPath = role === "PACIENTE" ? "/home-paciente" : "/home-psicologo";
      navigate(redirectPath);

    } catch (error) {
      authService.clearAuthData();
      setError(authService.getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin };
}