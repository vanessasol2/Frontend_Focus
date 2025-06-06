import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Pill, Search, Plus, Loader2 } from 'lucide-react';
import { Toaster, toast } from "sonner";
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import FiltroCrear from "../../components/crearPaciente/FiltroCrear";
import { useHistorialClinico } from "../../hook/useHistorialClinico";
import { SectionHeader } from "../../components/ui/historialClinico/SectionHeader";
import { CheckboxGroup } from "../../components/ui/historialClinico/CheckboxGroup";


const CrearHistorialClinico = () => {
  const navigate = useNavigate();
  const {
    historial,
    loading,
    error,
    pacienteId,
    HOBBIES_OPTIONS,
    MEDICAMENTOS_OPTIONS,
    ENFERMEDADES_OPTIONS,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  } = useHistorialClinico();

  const handleCancel = () => {
    console.log('Datos actuales:', historial);

    toast.warning('¿Cancelar registro?', {
      description: 'Se perderán los datos no guardados',
      action: {
        label: 'Confirmar',
        onClick: () => navigate(-1)
      },
      cancel: {
        label: 'Continuar'
      },
      duration: 10000
    });
  };

  return (
    <MainLayoutPsicologo>
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          duration: 10000,
          style: {
            maxWidth: '500px'
          }
        }}
      />

      <div className="p-4 md:p-6">
        <FiltroCrear />

        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Nueva Historia Clínica
                  </h1>
                  {pacienteId && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-primary-color shadow-sm">
                      <User className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                      <span className="sr-only">Paciente ID:</span>
                      {pacienteId}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 max-w-2xl">
                  Complete todos los campos obligatorios (<span className="text-red-500">*</span>) para registrar el historial clínico del paciente
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sección Hobbies */}
            <section className="p-6 bg-gray-50 rounded-lg">
              <SectionHeader icon={Plus} title="Hobbies e Intereses" />

              <div className="space-y-4">
                <CheckboxGroup
                  options={HOBBIES_OPTIONS}
                  selectedValues={historial.hobbies}
                  onChange={handleCheckboxChange}
                  type="hobbies"
                />

                {historial.hobbies.includes('OTRO') && (
                  <div className="mt-4 pl-7 relative">
                    <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <label htmlFor="otroHobbie" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Especificar otro hobbie
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="otroHobbie"
                        name="otroHobbie"
                        value={historial.otroHobbie}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg hover:border-primary-color 
                          focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-violet-100 
                          transition-all shadow-sm placeholder-gray-400 capitalize"
                        placeholder="Ej: Pintura al óleo, Jardinería"
                        disabled={loading}
                        aria-describedby="otroHobbie-help"
                        style={{ textTransform: 'capitalize' }}
                      />
                      {loading && (
                        <div className="absolute right-3 top-2.5">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p id="otroHobbie-help" className="mt-1.5 text-xs text-gray-500">
                      Describe el hobbie con el mayor detalle posible
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Sección Datos Médicos */}
            <section className="p-6 bg-gray-50 rounded-lg">
              <SectionHeader icon={Pill} title="Datos Médicos" />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                      Medicamentos que toma actualmente
                    </h3>

                    <CheckboxGroup
                      options={MEDICAMENTOS_OPTIONS}
                      selectedValues={historial.medicamentos}
                      onChange={handleCheckboxChange}
                      type="medicamentos"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    />
                  </div>

                  {historial.medicamentos.includes('Otro') && (
                    <div className="mt-4 pl-7 relative">
                      <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <label htmlFor="otroMedicamento" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Especificar otro medicamento
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="otroMedicamento"
                          name="otroMedicamento"
                          value={historial.otroMedicamento}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg hover:border-primary-color 
                            focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-violet-100 
                            transition-all shadow-sm placeholder-gray-400 capitalize"
                          placeholder="Ej: Paracetamol              "
                          disabled={loading}
                          aria-describedby="otroMedicamento-help"
                          style={{ textTransform: 'capitalize' }}
                        />
                      </div>
                      <p id="otroMedicamento-help" className="mt-1.5 text-xs text-gray-500">
                        Por favor especifique el nombre completo
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                      Enfermedades diagnosticadas
                    </h3>

                    <CheckboxGroup
                      options={ENFERMEDADES_OPTIONS}
                      selectedValues={historial.enfermedades}
                      onChange={handleCheckboxChange}
                      type="enfermedades"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    />
                  </div>

                  {historial.enfermedades.includes('otro') && (
                    <div className="mt-4 pl-7 relative">
                      <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      <label htmlFor="otraEnfermedad" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Especificar otra enfermedad
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="otraEnfermedad"
                          name="otraEnfermedad"
                          value={historial.otraEnfermedad}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg hover:border-primary-color 
                            focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-violet-100 
                            transition-all shadow-sm placeholder-gray-400 capitalize"
                          placeholder="Ej: Síndrome de fatiga crónica"
                          disabled={loading}
                          aria-describedby="otraEnfermedad-help"
                          style={{ textTransform: 'capitalize' }}
                        />
                        {loading && (
                          <div className="absolute right-3 top-2.5">
                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                          </div>
                        )}
                      </div>
                      <p id="otraEnfermedad-help" className="mt-1.5 text-xs text-gray-500">
                        Por favor especifique el nombre completo de la enfermedad
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Sección Ocupación y Observaciones */}
            <section className="p-6 bg-gray-50 rounded-lg">
              <SectionHeader icon={Search} title="Información Adicional" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ocupación*
                  </label>
                  <input
                    type="text"
                    name="ocupacion"
                    style={{ textTransform: 'capitalize' }}
                    value={historial.ocupacion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    placeholder="Ingrese la ocupación del paciente"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones Generales
                </label>
                <textarea
                  name="observacionesGenerales"
                  value={historial.observacionesGenerales}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                  placeholder="Ingrese observaciones relevantes sobre el paciente"
                  disabled={loading}
                />
              </div>
            </section>

            {/* Sección Contacto de Emergencia */}
            <section className="p-6 bg-gray-50 rounded-lg">
              <SectionHeader icon={User} title="Contacto de Emergencia" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre*
                  </label>
                  <input
                    type="text"
                    name="contactoEmergencia.nombre"
                    style={{ textTransform: 'capitalize' }}
                    value={historial.contactoEmergencia.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    placeholder="Nombre del contacto"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="contactoEmergencia.apellido"
                    style={{ textTransform: 'capitalize' }}
                    value={historial.contactoEmergencia.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    placeholder="Apellido del contacto"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parentesco*
                  </label>
                  <input
                    type="text"
                    name="contactoEmergencia.parentesco"
                    style={{ textTransform: 'capitalize' }}
                    value={historial.contactoEmergencia.parentesco}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    placeholder="Parentesco con el paciente"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono*
                  </label>
                  <input
                    type="tel"
                    name="contactoEmergencia.telefono"
                    value={historial.contactoEmergencia.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    placeholder="Número de teléfono"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="contactoEmergencia.correo"
                    value={historial.contactoEmergencia.correo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg border-gray-300 hover:border-primary-color focus:border-primary-color
                      focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    placeholder="Correo electrónico"
                    disabled={loading}
                  />
                </div>
              </div>
            </section>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-primary-color rounded-lg hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Historial'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CrearHistorialClinico;