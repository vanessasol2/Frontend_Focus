import React, { useState, useEffect } from "react";
import { User, Pill, Search, Plus, Minus } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
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
    console.log('Paciente ID:', pacienteId);
    if (!pacienteId) {
      console.error('Error: No se recibió el ID del paciente');
      setError('No se encontró el ID del paciente');
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
      }
      
      return { ...prev, [type]: currentArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pacienteId) {
      setError('ID de paciente no definido');
      return;
    }

    // Validación de campos obligatorios
    if (!historial.contactoEmergencia.nombre || !historial.contactoEmergencia.telefono) {
      setError('Nombre y teléfono de contacto de emergencia son obligatorios');
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
        otroHobbie: historial.otroHobbie || null,
        medicamentos: historial.medicamentos,
        otroMedicamento: historial.otroMedicamento || null,
        enfermedades: historial.enfermedades,
        otraEnfermedad: historial.otraEnfermedad || null,
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

      const response = await axios.post(
        `http://localhost:8081/historialClinico/crearHistorial/${pacienteId}`,
        dataToSend,
        config
      );

      navigate(`/pacientes/${pacienteId}/historial`, {
        state: { 
          success: true, 
          message: 'Historial creado con éxito',
          data: response.data
        }
      });

    } catch (error) {
      console.error('Error:', error);
      
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayoutPsicologo>
      <div className="p-4 mt-7">
        <FiltroCrear />
        
        <div className="max-w-6xl mx-auto p-6 rounded-lg">
          <h1 className="text-xl font-semibold mb-6 text-gray-800">
            Nueva Historia Clínica {pacienteId ? `para Paciente ID: ${pacienteId}` : ''}
          </h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección Hobbies */}
            <section className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <Plus size={20} />
                Hobbies e Intereses
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {HOBBIES_OPTIONS.map((hobbie) => (
                    <div key={hobbie.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`hobbie-${hobbie.value}`}
                        checked={historial.hobbies.includes(hobbie.value)}
                        onChange={() => handleCheckboxChange('hobbies', hobbie.value)}
                        className="h-4 w-4 text-[#5603AD] focus:ring-[#5603AD] border-gray-300 rounded"
                      />
                      <label htmlFor={`hobbie-${hobbie.value}`} className="ml-2 block text-sm text-gray-700">
                        {hobbie.label}
                      </label>
                    </div>
                  ))}
                </div>
                
                {historial.hobbies.includes('OTRO') && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Especificar otro hobbie</label>
                    <input
                      type="text"
                      name="otroHobbie"
                      value={historial.otroHobbie}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                      placeholder="Ingrese otro hobbie"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Sección Datos Médicos */}
            <section className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <Pill size={20} />
                Datos Médicos
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Medicamentos que toma actualmente</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MEDICAMENTOS_OPTIONS.map((med) => (
                      <div key={med.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`med-${med.value}`}
                          checked={historial.medicamentos.includes(med.value)}
                          onChange={() => handleCheckboxChange('medicamentos', med.value)}
                          className="h-4 w-4 text-[#5603AD] focus:ring-[#5603AD] border-gray-300 rounded"
                        />
                        <label htmlFor={`med-${med.value}`} className="ml-2 block text-sm text-gray-700">
                          {med.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {historial.medicamentos.includes('Otro') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Especificar otro medicamento</label>
                      <input
                        type="text"
                        name="otroMedicamento"
                        value={historial.otroMedicamento}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                        placeholder="Ingrese otro medicamento"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Enfermedades diagnosticadas</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ENFERMEDADES_OPTIONS.map((enfermedad) => (
                      <div key={enfermedad.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`enf-${enfermedad.value}`}
                          checked={historial.enfermedades.includes(enfermedad.value)}
                          onChange={() => handleCheckboxChange('enfermedades', enfermedad.value)}
                          className="h-4 w-4 text-[#5603AD] focus:ring-[#5603AD] border-gray-300 rounded"
                        />
                        <label htmlFor={`enf-${enfermedad.value}`} className="ml-2 block text-sm text-gray-700">
                          {enfermedad.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {historial.enfermedades.includes('otro') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Especificar otra enfermedad</label>
                      <input
                        type="text"
                        name="otraEnfermedad"
                        value={historial.otraEnfermedad}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                        placeholder="Ingrese otra enfermedad"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Sección Ocupación y Observaciones */}
            <section className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <Search size={20} />
                Información Adicional
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Ocupación*</label>
                  <input
                    type="text"
                    name="ocupacion"
                    value={historial.ocupacion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    placeholder="Ingrese la ocupación del paciente"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Observaciones Generales</label>
                <textarea
                  name="observacionesGenerales"
                  value={historial.observacionesGenerales}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  placeholder="Ingrese observaciones relevantes sobre el paciente"
                />
              </div>
            </section>

            {/* Sección Contacto de Emergencia */}
            <section className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <User size={20} />
                Contacto de Emergencia*
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Nombre*</label>
                  <input
                    type="text"
                    name="contactoEmergencia.nombre"
                    value={historial.contactoEmergencia.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    placeholder="Nombre del contacto"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    name="contactoEmergencia.apellido"
                    value={historial.contactoEmergencia.apellido}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    placeholder="Apellido del contacto"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Parentesco*</label>
                  <input
                    type="text"
                    name="contactoEmergencia.parentesco"
                    value={historial.contactoEmergencia.parentesco}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    placeholder="Parentesco con el paciente"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Teléfono*</label>
                  <input
                    type="tel"
                    name="contactoEmergencia.telefono"
                    value={historial.contactoEmergencia.telefono}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    placeholder="Número de teléfono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <input
                    type="email"
                    name="contactoEmergencia.correo"
                    value={historial.contactoEmergencia.correo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>
            </section>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#5603AD] text-white rounded-md hover:bg-[#47038C] focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:ring-opacity-50 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : 'Guardar Historial'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CrearHistorialClinico;