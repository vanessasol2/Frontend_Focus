import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, FileUser, BriefcaseBusiness, BookUser } from "lucide-react";
import agendar from "../../img/agendar.webp";
import { errorMessages, getBackendMessage } from "../../utils/errorMessages";

const tiposDocumento = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "PA", label: "Pasaporte" },
  { value: "RC", label: "Registro Civil" }
];

const validationRules = {
  nombre: {
    required: errorMessages['validation.required'],
    minLength: {
      value: 2,
      message: errorMessages['validation.minLength'].replace('{min}', '2')
    },
    maxLength: {
      value: 50,
      message: errorMessages['validation.maxLength'].replace('{max}', '50')
    }
  },
  apellido: {
    required: errorMessages['validation.required'],
    minLength: {
      value: 2,
      message: errorMessages['validation.minLength'].replace('{min}', '2')
    },
    maxLength: {
      value: 50,
      message: errorMessages['validation.maxLength'].replace('{max}', '50')
    }
  },
  username: {
    required: errorMessages['validation.required'],
    minLength: {
      value: 4,
      message: errorMessages['validation.minLength'].replace('{min}', '4')
    },
    maxLength: {
      value: 20,
      message: errorMessages['validation.maxLength'].replace('{max}', '20')
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: errorMessages['validation.username']
    }
  },
  tipoDocumento: {
    required: errorMessages['validation.required'],
  },
  fechaNacimiento: {
    required: errorMessages['validation.required'],
    validate: {
      validDate: (value) => {
        if (!value) return true; 
        const date = new Date(value);
        return !isNaN(date.getTime()) || 'Fecha no válida';
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
        return age >= 18 || 'Debes tener al menos 18 años';
      },
      notFuture: (value) => {
        if (!value) return true;
        const selectedDate = new Date(value);
        const today = new Date();
        return selectedDate <= today || 'La fecha no puede ser futura';
      }
    }
  },
  email: {
    required: errorMessages['validation.required'],
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: errorMessages['validation.email']
    }
  },
  password: {
    required: errorMessages['validation.required'],
    minLength: {
      value: 6,
      message: errorMessages['validation.password']
    },
    maxLength: {
      value: 30,
      message: errorMessages['validation.maxLength'].replace('{max}', '30')
    }
  },
  especialidad: {
    required: errorMessages['validation.required'],
    maxLength: {
      value: 100,
      message: errorMessages['validation.maxLength'].replace('{max}', '100')
    }
  },
  experiencia: {
    required: errorMessages['validation.required'],
    maxLength: {
      value: 500,
      message: errorMessages['validation.maxLength'].replace('{max}', '500')
    }
  },
  licencia: {
    required: errorMessages['validation.required'],
    pattern: {
      value: /^[a-zA-Z0-9-]+$/,
      message: errorMessages['validation.licencia']
    }
  }
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
  className = ""
}) => (
  <div className={`relative mb-6 ${className}`}>
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
        className={`w-full p-3 ${Icon ? 'pl-12' : 'pl-4'} border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none transition-all ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        {...register(id, validation)}
      >
        <option value="">{placeholder || 'Seleccione una opción'}</option>
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
        className={`w-full p-3 ${Icon ? 'pl-12' : 'pl-4'} pr-${
          showPasswordToggle ? '12' : '3'
        } border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none transition-all ${
          errors ? "border-purple-400" : "border-gray-300"
        }`}
        {...register(id, validation)}
        max={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
      />
    )}
    {showPasswordToggle && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    )}
    {errors && (
      <p className="absolute -bottom-5 left-0 text-sm text-red-500">
        {errors.message}
      </p>
    )}
  </div>
);

export function RegisterFormPsicologo() {
  const navigate = useNavigate();

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
      tipoDocumento:"",
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
  
    try {
      if (step === 1) {
        const response = await axios.post(`http://localhost:8081/funcionario/paso1`, {
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setPsicologoId(response.data);
        setStep(2);
      } else if (step === 2) {
        const response = await axios.post(
          `http://localhost:8081/funcionario/paso2/${psicologoId}`,
          {
            psicologoId,
            tipoDocumento: data.tipoDocumento,
            fechaNacimiento:data.fechaNacimiento, 
            username: data.username.trim(),
            email: data.email.trim(),
            password: data.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setStep(3);
      } else if (step === 3) {
        const response = await axios.post(
          `http://localhost:8081/funcionario/paso3/${psicologoId}`,
          {
            psicologoId,
            especialidad: data.especialidad.trim(),
            experiencia: data.experiencia.trim(),
            licencia: data.licencia.trim()
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        alert("¡Registro completado con éxito!");
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensajeError(getBackendMessage(error));
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full flex overflow-hidden">
        {/* Formulario */}
        <div className="w-1/2 p-10 flex flex-col justify-center h-full">
          {/* Indicador de pasos */}
          <div className="flex items-center justify-center mb-8 space-x-2">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors ${
                      step >= num
                        ? "border-primary-color bg-primary-color text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {num}
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium ${
                      step >= num ? "text-primary-color" : "text-gray-400"
                    }`}
                  >
                    {num === 1 ? "Personal" : num === 2 ? "Cuenta" : "Perfil"}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step > num ? "bg-primary-color" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <h4 className="text-xl font-semibold text-primary-color">Focus Frame</h4>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <>
            <InputField
              id="nombre"
              label="Nombre"
              icon={User}
              placeholder="Ingrese su nombre"
              register={register}
              errors={errors.nombre}
              validation={validationRules.nombre}
            />
            <InputField
              id="apellido"
              label="Apellido"
              icon={User}
              placeholder="Ingrese su apellido"
              register={register}
              errors={errors.apellido}
              validation={validationRules.apellido}
            />
          </>
        )}

        {step === 2 && (
          <>
            <InputField
              id="tipoDocumento"
              label="Tipo de documento"
              icon={FileUser}
              type="select"
              placeholder="Seleccione su tipo de documento"
              options={tiposDocumento}
              register={register}
              errors={errors.tipoDocumento}
              validation={validationRules.tipoDocumento}
            />
            <InputField
      id="fechaNacimiento"
      label="Fecha de Nacimiento"
      type="date"
      placeholder="Seleccione su fecha de nacimiento"
      register={register}
      errors={errors.fechaNacimiento}
      validation={validationRules.fechaNacimiento}
    />
            <InputField
              id="username"
              label="Nombre de usuario"
              icon={User}
              placeholder="Ingrese su usuario"
              register={register}
              errors={errors.username}
              validation={validationRules.username}
            />
            <InputField
              id="email"
              label="Correo electrónico"
              icon={Mail}
              type="email"
              placeholder="Ingrese su correo electrónico"
              register={register}
              errors={errors.email}
              validation={validationRules.email}
            />
            <InputField
              id="password"
              label="Contraseña"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
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
                  placeholder="Ingrese su especialidad"
                  register={register}
                  errors={errors.especialidad}
                  validation={validationRules.especialidad}
                />
                <InputField
                  id="experiencia"
                  label="Experiencia"
                  icon={FileUser}
                  placeholder="Ingrese su experiencia"
                  register={register}
                  errors={errors.experiencia}
                  validation={validationRules.experiencia}
                />
                <InputField
                  id="licencia"
                  label="Licencia"
                  icon={BookUser}
                  placeholder="Ingrese su licencia"
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

        {/* Imagen */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-button-primary rounded-xl">
          <div className="mb-6 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={agendar}
              className="w-80 h-auto object-cover rounded-xl hover:scale-[1.02] transition-transform duration-500"
              alt="Focus Frame"
            />
          </div>
          <div className="text-center max-w-xs">
            <p className="text-white text-base leading-relaxed">
              Con{" "}
              <span className="font-semibold text-secundary-color">
                FocusFrame
              </span>
              administra tu calendario, citas y archivos de tu paciente desde una interfaz unificada.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}