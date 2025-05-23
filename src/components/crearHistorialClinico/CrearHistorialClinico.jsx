import { User, Pill, Search, Plus, Loader2 } from 'lucide-react';
import { Toaster,toast } from "sonner";
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import FiltroCrear from "../../components/crearPaciente/FiltroCrear";
import { useHistorialClinico } from "../../hook/useHistorialClinico";
import { SectionHeader } from "../../components/ui/historialClinico/SectionHeader";
import { CheckboxGroup } from "../../components/ui/historialClinico/CheckboxGroup";


const CrearHistorialClinico = () => {
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
    const hasData = Object.values(historial).some(
      val => (typeof val === 'string' && val.trim() !== '') || 
             (typeof val === 'object' && Object.values(val).some(v => v.trim() !== ''))
    );
    
    if (hasData) {
      toast('¿Deseas cancelar el registro?', {
        description: 'Los datos no guardados se perderán',
        action: {
          label: 'Confirmar',
          onClick: () => navigate(-1)
        },
        cancel: {
          label: 'Continuar'
        }
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <MainLayoutPsicologo>
      <Toaster richColors position="top-center" />

      <div className="p-4 md:p-6">
        <FiltroCrear />
        
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Nueva Historia Clínica
            </h1>
            {pacienteId && (
              <p className="text-sm text-gray-500 mt-1">
                Paciente ID: {pacienteId}
              </p>
            )}
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
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especificar otro hobbie
                    </label>
                    <input
                      type="text"
                      name="otroHobbie"
                      value={historial.otroHobbie}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ingrese otro hobbie"
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Sección Datos Médicos */}
            <section className="p-6 bg-gray-50 rounded-lg">
              <SectionHeader icon={Pill} title="Datos Médicos" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Medicamentos que toma actualmente
                  </h3>
                  <CheckboxGroup 
                    options={MEDICAMENTOS_OPTIONS} 
                    selectedValues={historial.medicamentos} 
                    onChange={handleCheckboxChange} 
                    type="medicamentos"
                  />
                  
                  {historial.medicamentos.includes('Otro') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especificar otro medicamento
                      </label>
                      <input
                        type="text"
                        name="otroMedicamento"
                        value={historial.otroMedicamento}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ingrese otro medicamento"
                        disabled={loading}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Enfermedades diagnosticadas
                  </h3>
                  <CheckboxGroup 
                    options={ENFERMEDADES_OPTIONS} 
                    selectedValues={historial.enfermedades} 
                    onChange={handleCheckboxChange} 
                    type="enfermedades"
                  />
                  
                  {historial.enfermedades.includes('otro') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especificar otra enfermedad
                      </label>
                      <input
                        type="text"
                        name="otraEnfermedad"
                        value={historial.otraEnfermedad}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ingrese otra enfermedad"
                        disabled={loading}
                      />
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
                    value={historial.ocupacion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                    value={historial.contactoEmergencia.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                    value={historial.contactoEmergencia.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                    value={historial.contactoEmergencia.parentesco}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
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