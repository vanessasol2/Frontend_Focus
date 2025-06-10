import React from "react";
import { User, Mail, Lock,FileUser, BriefcaseBusiness, BookUser, File, FileText } from "lucide-react";
import { Toaster, toast } from "sonner";
import ImageSection from '../../components/ui/ImageSection/Imagen';
import agendar1 from "../../img/agendar1.jpeg";
import { InputField } from "../../components/ui/InputField";
import { useRegisterPsicologo } from "../../hook/useRegisterPsicologo";
import { TIPOS_DOCUMENTO } from "../../utils/constants";

export function RegisterFormPsicologo() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    mensajeError,
    showPassword,
    step,
    togglePasswordVisibility,
    onSubmit,
    tipoDocumento,
    validationRules
  } = useRegisterPsicologo();

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
                    className={`w-9 h-0.5  ${
                      step > num ? "bg-primary-color" : "bg-gray-200"
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
                  style={{ textTransform: 'capitalize' }} 
                  placeholder="Ingrese tu nombre"
                  register={register}
                  errors={errors.nombre}
                  validation={validationRules.nombre}
                  capitalize
                />
                <InputField
                  id="apellido"
                  label="Apellido"
                  icon={User}
                  style={{ textTransform: 'capitalize' }} 
                  placeholder="Ingrese tu apellido"
                  register={register}
                  errors={errors.apellido}
                  validation={validationRules.apellido}
                  capitalize
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
                  placeholder="Seleccione Tu Tipo De Documento"
                  options={TIPOS_DOCUMENTO}
                  register={register}
                  errors={errors.tipoDoc}
                  validation={validationRules.tipoDocumento}
                />
                <InputField
                  id="documento"
                  label="Número de documento"
                  icon={FileText}
                  placeholder="Ingrese Du Número De Documento"
                  register={register}
                  errors={errors.documento}
                  validation={validationRules.documento}
                />
                <InputField
                  id="fechaNacimiento"
                  label="Fecha de Nacimiento"
                  type="date"
                  placeholder="Seleccione Tu Fecha De Nacimiento"
                  register={register}
                  errors={errors.fechaNacimiento}
                  validation={validationRules.fechaNacimiento}
                />
                <InputField
                  id="username"
                  label="Nombre de usuario"
                  icon={User}
                  style={{ textTransform: 'capitalize' }} 
                  placeholder="Ingrese tu usuario"
                  register={register}
                  errors={errors.username}
                  validation={validationRules.username}
                  capitalize
                />
                <InputField
                  id="email"
                  label="Correo electrónico"
                  icon={Mail}
                  type="email"
                  placeholder="Ingrese Tu Correo Electrónico"
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
                  style={{ textTransform: 'capitalize' }} 
                  placeholder="Ingrese tu especialidad"
                  register={register}
                  errors={errors.especialidad}
                  validation={validationRules.especialidad}
                  capitalize
                />
                <InputField
                  id="experiencia"
                  label="Experiencia"
                  icon={FileUser}
                  placeholder="Ingrese Tu Experiencia En Años o Meses"
                  register={register}
                  errors={errors.experiencia}
                  validation={validationRules.experiencia}
                />
                <InputField
                  id="licencia"
                  label="Licencia"
                  icon={BookUser}
                  placeholder="Ingrese Tu Licencia"
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
                    {...register("terminos", { required: true })}
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
              disabled={isLoading}
              className={`w-full text-white py-3 rounded-lg transition-all button-primary ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading 
                ? "Procesando..." 
                : step === 3 
                  ? "Finalizar Registro" 
                  : "Siguiente"}
            </button>
            
            {mensajeError && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                {mensajeError}
              </div>
            )}
          </form>
        </div>

         {/* Sección de imagen */}
          <ImageSection image={agendar1} />
      </div>
    </main>
  );
}