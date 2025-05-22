import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, FileUser, BriefcaseBusiness, BookUser, File, FileText, } from "lucide-react";
import agendar1 from "../../img/agendar1.jpeg";
import { errorMessages, getBackendMessage } from "../../utils/errorMessages";
import { toast, Toaster } from "sonner";

const tiposDocumento = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "PA", label: "Pasaporte" },
  { value: "RC", label: "Registro Civil" },
];

const validationRules = {
  nombre: {
    required: errorMessages.validation.required,
    minLength: {
      value: 2,
      message: errorMessages.validation.minLength.replace("{min}", "2"),
    },
    maxLength: {
      value: 50,
      message: errorMessages.validation.maxLength.replace("{max}", "50"),
    },
    pattern: {
      value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      message: errorMessages.validation.onlyLetters || "Solo se permiten letras y espacios"
    }
  },
  apellido: {
    required: errorMessages.validation.required,
    minLength: {
      value: 2,
      message: errorMessages.validation.minLength.replace("{min}", "2"),
    },
    maxLength: {
      value: 50,
      message: errorMessages.validation.maxLength.replace("{max}", "50"),
    },
    pattern: {
      value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      message: errorMessages.validation.onlyLetters || "Solo se permiten letras y espacios"
    }
  },
  username: {
    required: errorMessages.validation.required,
    minLength: {
      value: 4,
      message: errorMessages.validation.minLength.replace("{min}", "4"),
    },
    maxLength: {
      value: 20,
      message: errorMessages.validation.maxLength.replace("{max}", "20"),
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: errorMessages.validation.username,
    },
  },
  tipoDocumento: {
    required: errorMessages.validation.required,
  },
  documento: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[0-9]+$/,
      message: errorMessages.validation.numeric,
    },
    validate: {
      maxLength: (value) =>
        value.length <= 10 || errorMessages.validation.maxLength.replace("{max}", "10"),
      validNumber: (value) => {
        const num = Number(value);
        return num <= 2147483647 || errorMessages.validation.numberTooLarge || "Número demasiado grande";
      }
    }
  },
  fechaNacimiento: {
    required: errorMessages.validation.required,
    validate: {
      validDate: (value) => {
        if (!value) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || errorMessages.validation.invalidDate || "Fecha no válida";
      },
      minAge: (value) => {
        if (!value) return true;
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18 || errorMessages.validation.minAge.replace("{min}", "18");
      },
      notFuture: (value) => {
        if (!value) return true;
        return new Date(value) <= new Date() || errorMessages.validation.futureDate || "La fecha no puede ser futura";
      },
    },
  },
  email: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: errorMessages.validation.email,
    },
  },
  password: {
    required: errorMessages.validation.required,
    minLength: {
      value: 6,
      message: errorMessages.validation.password,
    },
    maxLength: {
      value: 30,
      message: errorMessages.validation.maxLength.replace("{max}", "30"),
    },
  },
  especialidad: {
    required: errorMessages.validation.required,
    maxLength: {
      value: 100,
      message: errorMessages.validation.maxLength.replace("{max}", "100"),
    },
  },
  experiencia: {
    required: errorMessages.validation.required,
    maxLength: {
      value: 500,
      message: errorMessages.validation.maxLength.replace("{max}", "500"),
    },
  },
  licencia: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[a-zA-Z0-9-]+$/,
      message: errorMessages.validation.licencia,
    },
    minLength: {
      value: 6,
      message: errorMessages.validation.minLength.replace("{min}", "6"),
    },
    maxLength: {
      value: 20,
      message: errorMessages.validation.maxLength.replace("{max}", "20"),
    },
  },
};



const InputField = ({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  register,
  errors,
  validation,
  options,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = null,
  className = "",
}) => (
  <div className={`relative mb-7 ${className}`}>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    {Icon && (
      <Icon
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    )}
    {type === "select" ? (
      <select
        id={id}
        className={`w-full p-3 ${Icon ? "pl-12" : "pl-4"
          }  border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all ${errors
            ? "border-red-500 bg-red-50 focus:ring-red-200"
            : "border-gray-300 hover:border-gray-400 focus:border-primary-color "
          }`}
        {...register(id, validation)}
      >
        <option value="">{placeholder || "Seleccione una opción"}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full p-3 ${Icon ? "pl-12" : "pl-4"} pr-${showPasswordToggle ? "12" : "3"
          } border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all ${errors
            ? "border-red-500 bg-red-50 focus:ring-red-200"
            : "border-gray-300 hover:border-gray-400 focus:border-primary-color "
          }`}
        {...register(id, validation)}
        max={
          type === "date" ? new Date().toISOString().split("T")[0] : undefined
        }
      />
    )}
    {showPasswordToggle && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 "
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    )}
    {errors && (
      <p className="absolute   -bottom-5 left-0 text-sm text-red-500">
        {errors.message}
      </p>
    )}
  </div>
);

export function RegisterFormPsicologo() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
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
    },
  });

  const [mensajeError, setMensajeError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [psicologoId, setPsicologoId] = useState(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setMensajeError("");
    setIsLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "es"
        }
      };

      if (step === 1) {
        const responsePaso1 = await axios.post(
          `http://localhost:8081/funcionario/paso1`,
          {
            nombre: data.nombre.trim(),
            apellido: data.apellido.trim(),
          },
          config
        );
        console.log("Respuesta completa del paso 1:", responsePaso1.data);

        if (!responsePaso1.data?.idFuncionario) {
          throw new Error("No se recibió el ID del funcionario en la respuesta");
        }

        const registrationData = {
          step: 2,
          idFuncionario: responsePaso1.data.idFuncionario,
          datosPaso1: {
            nombre: data.nombre.trim(),
            apellido: data.apellido.trim()
          }
        };
        localStorage.setItem('psicologoRegistration', JSON.stringify(registrationData));
        console.log("Datos guardados en localStorage:", registrationData);

        setPsicologoId(responsePaso1.data.idFuncionario);
        setStep(2);

      } else if (step === 2) {
        const savedDataStr = localStorage.getItem('psicologoRegistration');
        if (!savedDataStr) {
          throw new Error("No se encontraron datos de registro guardados");
        }

        const savedData = JSON.parse(savedDataStr);
        console.log("Datos recuperados de localStorage:", savedData);

        const currentId = psicologoId || savedData?.idFuncionario;
        console.log("Current ID:", currentId);

        if (!currentId) {
          console.error("Error: No se pudo obtener el ID del funcionario");
          console.error("Datos disponibles:", {
            psicologoId,
            savedData
          });
          throw new Error("Error en el flujo de registro. Por favor comience nuevamente.");
        }

        const responsePaso2 = await axios.post(
          `http://localhost:8081/funcionario/paso2/${currentId}`,
          {
            username: data.username.trim(),
            email: data.email.trim(),
            password: data.password,
            tipoDoc: data.tipoDoc,
            fechaNacimiento: data.fechaNacimiento,
            documento: data.documento,
          },
          {
            ...config,
            withCredentials: false
          }
        );

        console.log("Respuesta del Paso 2:", responsePaso2.data);


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
        console.log("Datos actualizados en localStorage:", updatedRegistrationData);

        setPsicologoId(currentId);
        setStep(3);

      } else if (step === 3) {
        const savedData = JSON.parse(localStorage.getItem('psicologoRegistration'));
        const currentId = psicologoId || savedData?.idUsuario;

        if (!currentId) {
          throw new Error("Error en el flujo de registro. Por favor comience nuevamente.");
        }

        const responsePaso3 = await axios.post(
          `http://localhost:8081/funcionario/paso3/${currentId}`,
          {
            especialidad: data.especialidad.trim(),
            experiencia: data.experiencia.trim(),
            licencia: data.licencia.trim(),
          },
          config
        );

        localStorage.removeItem('psicologoRegistration');

        toast.success("Registro completado con éxito");
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error en el registro:", error);


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

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Toaster richColors expand={true} />
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        {/* Formulario */}
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          {/* Indicador de pasos */}
          <div className="flex items-center justify-center mb-8 space-x-2">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors ${step >= num
                      ? "border-primary-color bg-primary-color text-white"
                      : "border-gray-300 text-gray-400"
                      }`}
                  >
                    {num}
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium ${step >= num ? "text-primary-color" : "text-gray-400"
                      }`}
                  >
                    {num === 1 ? "Personal" : num === 2 ? "Cuenta" : "Perfil"}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`w-8 h-0.5 ${step > num ? "bg-primary-color" : "bg-gray-200"
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <h4 className="text-xl font-semibold text-primary-color">
            Focus Frame
          </h4>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 3
              ? "Completa tu Perfil"
              : step === 2
                ? "Registro de Usuario"
                : "Datos Personales"}
          </h2>
          <p className="text-gray-500 mb-6">
            {step === 3
              ? "Añade más detalles sobre tu perfil."
              : step === 2
                ? "Crea tu cuenta para acceder."
                : "Ingresa tu nombre y apellido."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <InputField
                  id="nombre"
                  label="Nombre"
                  icon={User}
                  placeholder="Ingrese tu nombre"
                  register={register}
                  errors={errors.nombre}
                  validation={validationRules.nombre}
                />
                <InputField
                  id="apellido"
                  label="Apellido"
                  icon={User}
                  placeholder="Ingrese tu apellido"
                  register={register}
                  errors={errors.apellido}
                  validation={validationRules.apellido}
                />
              </>
            )}

            {step === 2 && (
              <>
                <InputField
                  id="tipoDoc"
                  label="Tipo de documento"
                  icon={File}
                  type="select"
                  placeholder="Seleccione tu tipo de documento"
                  options={tiposDocumento}
                  register={register}
                  errors={errors.tipoDoc}
                  validation={validationRules.tipoDocumento}
                />
                <InputField
                  id="documento"
                  label="Número de documento"
                  icon={FileText}
                  placeholder="Ingrese su número de documento"
                  register={register}
                  errors={errors.documento}
                  validation={{
                    required: "El número de documento es requerido",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                    minLength: {
                      value: 5,
                      message: "Mínimo 5 caracteres",
                    },
                    maxLength: {
                      value: 15,
                      message: "Máximo 15 caracteres",
                    },
                  }}
                />
                <InputField
                  id="fechaNacimiento"
                  label="Fecha de Nacimiento"
                  type="date"
                  placeholder="Seleccione tu fecha de nacimiento"
                  register={register}
                  errors={errors.fechaNacimiento}
                  validation={validationRules.fechaNacimiento}
                />
                <InputField
                  id="username"
                  label="Nombre de usuario"
                  icon={User}
                  placeholder="Ingrese tu usuario"
                  register={register}
                  errors={errors.username}
                  validation={validationRules.username}
                />
                <InputField
                  id="email"
                  label="Correo electrónico"
                  icon={Mail}
                  type="email"
                  placeholder="Ingrese tu correo electrónico"
                  register={register}
                  errors={errors.email}
                  validation={validationRules.email}
                />
                <InputField
                  id="password"
                  label="Contraseña"
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese tu contraseña"
                  register={register}
                  errors={errors.password}
                  validation={validationRules.password}
                  showPasswordToggle={true}
                  showPassword={showPassword}
                  onTogglePassword={togglePasswordVisibility}
                />
              </>
            )}

            {step === 3 && (
              <>
                <InputField
                  id="especialidad"
                  label="Especialidad"
                  icon={BriefcaseBusiness}
                  placeholder="Ingrese tu especialidad"
                  register={register}
                  errors={errors.especialidad}
                  validation={validationRules.especialidad}
                />
                <InputField
                  id="experiencia"
                  label="Experiencia"
                  icon={FileUser}
                  placeholder="Ingrese tu experiencia"
                  register={register}
                  errors={errors.experiencia}
                  validation={validationRules.experiencia}
                />
                <InputField
                  id="licencia"
                  label="Licencia"
                  icon={BookUser}
                  placeholder="Ingrese tu licencia"
                  register={register}
                  errors={errors.licencia}
                  validation={validationRules.licencia}
                />
                <div className="flex items-start space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="terminos"
                    required
                    className="mt-1 accent-purple-600"
                  />
                  <label htmlFor="terminos" className="text-sm text-gray-700">
                    Acepto el tratamiento de mis datos personales y sensibles
                    según la{" "}
                    <a
                      href="/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline hover:text-purple-800"
                    >
                      Política de Privacidad
                    </a>
                    .
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-all button-primary"
            >
              {step === 3 ? "Finalizar Registro" : "Siguiente"}
            </button>
            {mensajeError && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                {mensajeError}
              </div>
            )}
          </form>
        </div>

        {/* Sección de imagen */}
        <div
          className="w-full md:w-1/2 hidden md:block relative min-h-[500px] rounded-l-lg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${agendar1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 grid place-items-center p-6">
            {/* Logo posicionado absolutamente arriba */}
            <p className="absolute top-6 left-0 right-0 text-center font-sans text-primary-color/80 text-[10px] tracking-[0.3em] font-thin">
              FOCUSFRAME
            </p>

            {/* Contenido centrado */}
            <div className="text-center space-y-3">
              <p className="font-sans text-2xl text-white font-medium">
                Gestión unificada de calendarios y expedientes
              </p>
              <div className="h-px w-16 mx-auto bg-white/30"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}