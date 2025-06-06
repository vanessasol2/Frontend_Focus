import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import pacienteService from "../service/pacienteService";
import { toast } from "sonner";

export const useRegisterPaciente = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      toast.error("No tienes permiso para completar el perfil");
      return;
    }

    if (!data.aceptaTerminos) {
      toast.error("Debes aceptar los Términos y Condiciones para continuar."); 
      return;
    }

    setIsSubmitting(true);

    try {
      await pacienteService.completarPerfil(pacienteId, {
        username: data.username,
        password: data.password,
      });

      toast.success("Perfil completado correctamente"); 

      reset();
      navigate("/login");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Ocurrió un error al registrar el paciente");
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
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  };
};
