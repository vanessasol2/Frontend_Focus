import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar, HeartPulse, Pill, Gamepad2,
  Phone, Mail, User, BookUser,
  AlertCircle, Stethoscope, ClipboardList
} from 'lucide-react';
import { pacienteMetodoService } from '../../service/pacienteMetodoService';

const PacienteInfo = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    historialClinico: {},
    paciente: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await pacienteMetodoService.getHistorialPaciente(id);
        console.log("Datos completos de la API:", response);
        setApiData(response);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError(err.message || 'Error al cargar los datos del paciente');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const pacienteInfo = {
    ...apiData.paciente,
    ...apiData.historialClinico,
    contactoEmergencia: apiData.historialClinico.contactoEmergencia || {}
  };

  const hasData = (
    (apiData.paciente && Object.keys(apiData.paciente).length > 0) ||
    (apiData.historialClinico && Object.keys(apiData.historialClinico).length > 0
    ));

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
    </div>
  );
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-4xl mx-auto">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      </div>
    </div>
  );
  if (!hasData) return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-4xl mx-auto">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">No se encontraron datos del paciente</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="content-bg rounded-xl overflow-hidden mt-7">
      {/* Header del paciente */}
      <div className="bg-button-primary p-2 text-white w-full max-w-4xl mx-auto ">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-3">
          {/* Imagen del perfil */}
          <div className="relative flex-shrink-0 mb-3 sm:mb-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden border-3 border-white/50 bg-gray-200">
              <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                <User className="w-8 h-8 text-primary-color" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"></span>
          </div>

          {/* Información principal */}
          <div className="flex-1 min-w-0 px-1 sm:px-0">
            <div className="flex items-center gap-1">
              <h1 className="text-base sm:text-lg font-sm leading-snug break-words hyphens-auto">
                {pacienteInfo.nombrePaciente || 'Nombre no especificado'} {pacienteInfo.apellido || ''}
              </h1>
            </div>

            <div className="flex items-center gap-1 text-blue-100 text-xs mt-1">
              <p>{pacienteInfo.ocupacion || 'Ocupación no especificada'}</p>
            </div>

            <div className="mt-1 sm:mt-2">
              <span className="inline-flex items-center px-2 py-0.5 bg-white/20 rounded-full text-xs whitespace-nowrap">
                <Calendar className="h-3 w-3 mr-1" />
                {pacienteInfo.fechacreacion ? (
                  `Paciente creado: ${new Date(pacienteInfo.fechacreacion).toLocaleDateString('es-ES', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}`
                ) : 'Fecha no disponible'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del paciente */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información básica */}
          <div className="bg-white rounded-lg shadow-sm p-4 ">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary-color" />
              Información Básica
            </h3>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-gray-500  font-medium tracking-wider">Fecha de Nacimiento</p>
                <p className="text-sm mt-1 text-gray-900 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {pacienteInfo.fechaNacimiento ? (
                    new Date(pacienteInfo.fechaNacimiento).toLocaleDateString()
                  ) : 'No especificada'}
                </p>
              </li>
              <li>
                <p className="text-xs text-gray-500 font-medium tracking-wider ">Teléfono</p>
                <p className="text-sm mt-1 text-gray-900 flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {pacienteInfo.telefono || 'No especificado'}
                </p>
              </li>
              <li>
                <p className="text-xs text-gray-500 font-medium tracking-wider">Estado</p>
                <p className="text-sm font-semibold mt-1 text-green-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  {pacienteInfo.estado ? 'Activo' : 'Inactivo'}
                </p>
              </li>
            </ul>
          </div>

          {/* Información médica */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary-color" />
              Información Médica
            </h3>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-gray-500 font-medium tracking-wider flex items-center gap-1">
                  <HeartPulse className="h-3 w-3" />
                  Enfermedades
                </p>
                <p className="text-sm mt-1 text-gray-900">
                  {pacienteInfo.enfermedades?.length > 0
                    ? pacienteInfo.enfermedades.join(", ")
                    : 'Ninguna registrada'}
                </p>
              </li>
              <li>
                <p className="text-xs text-gray-500 font-medium tracking-wider flex items-center gap-1">
                  <Pill className="h-3 w-3" />
                  Medicamentos
                </p>
                <p className="text-sm mt-1 text-gray-900">
                  {pacienteInfo.medicamentos?.length > 0
                    ? pacienteInfo.medicamentos.join(", ")
                    : 'Ninguno registrado'}
                </p>
              </li>
              <li>
                <p className="text-xs text-gray-500 font-medium tracking-wider flex items-center gap-1">
                  <Gamepad2 className="h-3 w-3" />
                  Hobbies
                </p>
                <p className="text-sm mt-1 text-gray-900">
                  {pacienteInfo.hobbies?.length > 0
                    ? pacienteInfo.hobbies.join(", ")
                    : 'Ninguno registrado'}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Contacto de emergencia */}
        {pacienteInfo.contactoEmergencia?.nombre && (
          <div className="bg-violet-50 rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary-color" />
              Contacto de Emergencia
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-medium tracking-wider">Nombre</p>
                <p className="text-sm mt-1 text-gray-900 flex items-center gap-1">
                  <User className="h-4 w-4 text-gray-500" />
                  {pacienteInfo.contactoEmergencia.nombre} {pacienteInfo.contactoEmergencia.apellido}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium tracking-wider">Parentesco</p>
                <p className="text-sm mt-1 text-gray-900">
                  {pacienteInfo.contactoEmergencia.parentesco || 'No especificado'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium tracking-wider">Teléfono</p>
                <p className="text-sm mt-1 text-gray-900 flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {pacienteInfo.contactoEmergencia.telefono || 'No especificado'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium tracking-wider">Email</p>
                <p className="text-sm mt-1 text-gray-900 truncate flex items-center gap-1">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {pacienteInfo.contactoEmergencia.correo || 'No especificado'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Observaciones generales */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary-color" />
            Observaciones Generales
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {pacienteInfo.observacionesGenerales || "No hay observaciones registradas."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacienteInfo;