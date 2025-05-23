import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import pacienteService from "../service/pacienteService";

export const useRegisterPaciente = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      aceptaTerminos: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    if (!pacienteId) {
      setMensajeError("No tienes permiso para completar el perfil");
      return;
    }

    if (!data.aceptaTerminos) {
      setMensajeError("Debes aceptar los Términos y Condiciones para continuar.");
      return;
    }

    setMensajeError("");
    setIsSubmitting(true);

    try {
      await pacienteService.completarPerfil(pacienteId, {
        username: data.username,
        password: data.password,
      });

      // Éxito
      reset();
      navigate("/login");
      return { success: true };
    } catch (error) {
      setMensajeError(error.message);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    mensajeError,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  };
};