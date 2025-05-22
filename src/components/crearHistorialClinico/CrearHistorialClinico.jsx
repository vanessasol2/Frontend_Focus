import React, { useState, useEffect } from "react";
import { User, Pill, Search, Plus, Minus, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import FiltroCrear from "../../components/crearPaciente/FiltroCrear";
import axios from 'axios';

const HOBBIES_OPTIONS = [
  { value: 'DEPORTE', label: 'Deporte' },
  { value: 'LECTURA', label: 'Lectura' },
  { value: 'VIDEOJUEGOS', label: 'Videojuegos' },
  { value: 'MUSICA', label: 'Música' },
  { value: 'COCINA', label: 'Cocina' },
  { value: 'OTRO', label: 'Otro' }
];

const MEDICAMENTOS_OPTIONS = [
  { value: 'Metformina', label: 'Metformina' },
  { value: 'Losartán', label: 'Losartán' },
  { value: 'Salbutamol', label: 'Salbutamol' },
  { value: 'Fluoxetina', label: 'Fluoxetina' },
  { value: 'Alprazolam', label: 'Alprazolam' },
  { value: 'Ibuprofeno', label: 'Ibuprofeno' },
  { value: 'Aspirina', label: 'Aspirina' },
  { value: 'Paracetamol', label: 'Paracetamol' },
  { value: 'Amoxicilina', label: 'Amoxicilina' },
  { value: 'Ciprofloxacino', label: 'Ciprofloxacino' },
  { value: 'Omeprazol', label: 'Omeprazol' },
  { value: 'Simvastatina', label: 'Simvastatina' },
  { value: 'Lisinopril', label: 'Lisinopril' },
  { value: 'Sertralina', label: 'Sertralina' },
  { value: 'Diazepam', label: 'Diazepam' },
  { value: 'Otro', label: 'Otro' }
];

const ENFERMEDADES_OPTIONS = [
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Hipertension', label: 'Hipertensión' },
  { value: 'Asma', label: 'Asma' },
  { value: 'Depresion', label: 'Depresión' },
  { value: 'Ansiedad', label: 'Ansiedad' },
  { value: 'Artritis', label: 'Artritis' },
  { value: 'Migrana', label: 'Migraña' },
  { value: 'Esquizofrenia', label: 'Esquizofrenia' },
  { value: 'TDAH', label: 'TDAH' },
  { value: 'Autismo', label: 'Autismo' },
  { value: 'Epilepsia', label: 'Epilepsia' },
  { value: 'Cancer', label: 'Cáncer' },
  { value: 'EnfermedadCardiaca', label: 'Enfermedad cardiaca' },
  { value: 'Obesidad', label: 'Obesidad' },
  { value: 'Alzheimer', label: 'Alzheimer' },
  { value: 'ninguna', label: 'Ninguna' },
  { value: 'otro', label: 'Otro' }
];

const CrearHistorialClinico = () => {
  const navigate = useNavigate();
  const { pacienteId } = useParams();

  const [historial, setHistorial] = useState({
    hobbies: [],
    otroHobbie: '',
    medicamentos: [],
    otroMedicamento: '',
    enfermedades: [],
    otraEnfermedad: '',
    ocupacion: '',
    observacionesGenerales: '',
    contactoEmergencia: {
      nombre: '',
      apellido: '',
      parentesco: '',
      telefono: '',
      correo: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pacienteId) {
      console.error('Error: No se recibió el ID del paciente');
      setError('No se encontró el ID del paciente');
      toast.error('No se encontró el ID del paciente');
    }
  }, [pacienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contactoEmergencia.')) {
      const field = name.split('.')[1];
      setHistorial(prev => ({
        ...prev,
        contactoEmergencia: {
          ...prev.contactoEmergencia,
          [field]: value
        }
      }));
    } else {
      setHistorial(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (type, value) => {
    setHistorial(prev => {
      const currentArray = [...prev[type]];
      const index = currentArray.indexOf(value);
      
      if (index === -1) {
        currentArray.push(value);
      } else {
        currentArray.splice(index, 1);
        if(index === -1){
          currentArray.push(value);
        } else{
          currentArray.splice(index,1);
          if(value ==='OTRO' && type === 'hobbies'){
            return{...prev, [type]:currentArray,otroHobbie:''};
          }else if (value === 'Otro' && type === 'medicamentos'){
            return{...prev,[type]:currentArray,otroMedicamento:''};
          }else if (value === 'otro' && type ==='enfermedades'){
            return{...prev, [type]: currentArray,otraEnfermedad:""};
          }
        }
      }
      return { ...prev, [type]: currentArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pacienteId) {
      toast.error('ID de paciente no definido');
      return;
    }

    if (!historial.contactoEmergencia.nombre || !historial.contactoEmergencia.telefono) {
      toast.error('Nombre y teléfono de contacto de emergencia son obligatorios');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }

      const dataToSend = {
        hobbies: historial.hobbies,
        otroHobbie: historial.hobbies.includes('OTRO')? historial.otroHobbie || null : null,
        medicamentos: historial.medicamentos,
        otroMedicamento: historial.medicamentos.includes('Otro') ? historial.otroMedicamento || null : null,
        enfermedades: historial.enfermedades,
        otraEnfermedad: historial.enfermedades.includes('otro')?historial.otraEnfermedad || null : null,
        ocupacion: historial.ocupacion,
        observacionesGenerales: historial.observacionesGenerales,
        contactoEmergencia: historial.contactoEmergencia
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.post(
        `http://localhost:8081/historialClinico/crearHistorial/${pacienteId}`,
        dataToSend,
        config
      );

      toast.success('Historial clínico guardado con éxito', {
        duration: 2000,
        position: 'top-center'
      });

      setTimeout(() => {
        navigate('/pacientes'); 
      }, 2000);

    } catch (error) {
      console.error('Error al guardar el historial:', error);
      let errorMessage = 'Error al guardar el historial';
      
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = 'Acceso denegado. Tu sesión puede haber expirado.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, color = "text-primary-600" }) => (
    <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
      <Icon className={`w-5 h-5 mr-2 ${color}`} />
      <h2 className={`text-lg font-semibold ${color}`}>{title}</h2>
    </div>
  );

  const CheckboxGroup = ({ options, selectedValues, onChange, type }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={() => onChange(type, option.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );

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
                
                {historial.hobbies.includes('otro') && (
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
                      disabled={isSubmitting}
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
                  
                  {historial.medicamentos.includes('otro') && (
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </section>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  const hasData = Object.values(historial).some(
                    val => (typeof val === 'string' && val.trim() !== '') || 
                           (typeof val === 'object' && Object.values(val).some(v => v.trim() !== ''))
                  )
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
                }}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-white bg-primary-color rounded-lg hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
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