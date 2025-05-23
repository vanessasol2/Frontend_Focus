import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { psicologoService } from "../service/psicologoService";
import { getBackendMessage } from "../utils/errorMessages";
import { validationRules } from "../utils/validationRules";
import { TIPOS_DOCUMENTO } from "../utils/constants"; 

export const useRegisterPsicologo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [psicologoId, setPsicologoId] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      username: "",
      tipoDoc: "",
      fechaNacimiento: "",
      email: "",
      password: "",
      especialidad: "",
      experiencia: "",
      licencia: "",
      documento: ""
    }
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePaso1 = async (data) => {
    try {
      const response = await psicologoService.registrarPaso1(data);
      const idFuncionario = response.data.idFuncionario;
      
      const registrationData = {
        step: 2,
        idFuncionario,
        datosPaso1: {
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim()
        }
      };
      
      localStorage.setItem('psicologoRegistration', JSON.stringify(registrationData));
      setPsicologoId(idFuncionario);
      setStep(2);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const handlePaso2 = async (data, currentId) => {
    try {
      await psicologoService.registrarPaso2(currentId, data);
      
      const savedData = JSON.parse(localStorage.getItem('psicologoRegistration'));
      const updatedRegistrationData = {
        ...savedData,
        step: 3,
        idUsuario: currentId,
        datosPaso2: {
          username: data.username.trim(),
          email: data.email.trim(),
          tipoDoc: data.tipoDoc,
          documento: data.documento
        }
      };
      
      localStorage.setItem('psicologoRegistration', JSON.stringify(updatedRegistrationData));
      setPsicologoId(currentId);
      setStep(3);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const handlePaso3 = async (data, currentId) => {
    try {
      await psicologoService.registrarPaso3(currentId, data);
      localStorage.removeItem('psicologoRegistration');
      reset();
      navigate("/login");
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setMensajeError("");
    setIsLoading(true);

    try {
      if (step === 1) {
        await handlePaso1(data);
      } else if (step === 2) {
        const savedData = JSON.parse(localStorage.getItem('psicologoRegistration'));
        const currentId = psicologoId || savedData?.idFuncionario;
        
        if (!currentId) {
          throw new Error("Error en el flujo de registro. Por favor comience nuevamente.");
        }
        
        await handlePaso2(data, currentId);
      } else if (step === 3) {
        const savedData = JSON.parse(localStorage.getItem('psicologoRegistration'));
        const currentId = psicologoId || savedData?.idUsuario;
        
        if (!currentId) {
          throw new Error("Error en el flujo de registro. Por favor comience nuevamente.");
        }
        
        await handlePaso3(data, currentId);
        toast.success("Registro completado con éxito");
      }
    } catch (error) {
      const errorMessage = getBackendMessage(error);
      setMensajeError(errorMessage);

      toast.error(errorMessage, {
        duration: 7000,
        action: error.response?.status === 409 ? {
          label: 'Reintentar',
          onClick: () => handleSubmit(onSubmit)()
        } : null
      });

      if (error.response?.status === 404) {
        localStorage.removeItem('psicologoRegistration');
        setStep(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    mensajeError,
    showPassword,
    step,
    togglePasswordVisibility,
    onSubmit,
    TIPOS_DOCUMENTO,
    validationRules
  };
};