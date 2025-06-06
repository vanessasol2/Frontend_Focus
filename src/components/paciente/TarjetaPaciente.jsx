import React from "react";
import { Calendar, User, Phone, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ESTADOS = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo'
};

const ESTADO_CITAS = {
  PENDIENTES: 'Tiene citas pendientes',
  SIN_CITAS: 'Sin citas pendientes'
};

const getProgressColor = (progress) => {
  if (isNaN(progress)) return "bg-gray-500";
  if (progress < 30) return "bg-red-500";
  if (progress < 70) return "bg-yellow-500";
  return "bg-green-500";
};

const formatDate = (dateInput) => {
  if (!dateInput || dateInput === 'Invalid Date') return "Sin fecha";

  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) return "Fecha inválida";

    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const year = adjustedDate.getFullYear();

    return `${day}/${month}/${year}`;

  } catch (error) {
    console.error('Error al formatear fecha:', { input: dateInput, error });
    return "Fecha inválida";
  }
};

const calculateProgress = (paciente) => {
  if (paciente.sesionesTotales > 0) {
    return Math.round((paciente.sesionesCompletadas / paciente.sesionesTotales) * 100);
  }
  return 0;
};

const TarjetaPaciente = ({ paciente }) => {
  const normalizedPaciente = {
    id: paciente.id,
    nombrePaciente: paciente.nombre || paciente.nombrePaciente || 'Sin nombre',
    email: paciente.correo || paciente.email || 'Sin email',
    estado: paciente.estado === 'activo',
    telefono: paciente.telefono || '',
    fechaCreacionHistorial: paciente.ultimaVisita || paciente.fechaCreacionHistorial,
    sesionesCompletadas: paciente.sesionesCompletadas || 0,
    sesionesTotales: paciente.sesionesTotales || 0,
    porcentajeTerapia: paciente.progreso || calculateProgress(paciente),
    tieneCitasPendientes: paciente.tieneCitasPendientes || false
  };

  const estado = normalizedPaciente.estado ? ESTADOS.ACTIVO : ESTADOS.INACTIVO;
  const progreso = normalizedPaciente.porcentajeTerapia;
  const telefono = normalizedPaciente.telefono ? normalizedPaciente.telefono.toString() : 'Sin teléfono';

  const tieneTerapia = normalizedPaciente.sesionesTotales > 0;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
          <User className="text-primary-color" size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate" title={normalizedPaciente.nombrePaciente}>
            {normalizedPaciente.nombrePaciente}
          </p>
          <p className="text-xs text-gray-500 truncate" title={normalizedPaciente.email}>
            {normalizedPaciente.email}
          </p>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${estado === ESTADOS.ACTIVO ? 'bg-green-500' : 'bg-gray-400'}`}
          title={estado === ESTADOS.ACTIVO ? 'Activo' : 'Inactivo'}
        />
      </div>

      {/* Barra de progreso */}
      <div className="mb-3 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={14} className="text-blue-500" />
          <span className="text-xs font-medium">Progreso de terapia</span>
        </div>

        {tieneTerapia ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">
                {isNaN(progreso) ? 'Sin datos' : `${progreso}%`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(progreso)}`}
                style={{ width: `${isNaN(progreso) ? 0 : progreso}%` }}
              />
            </div>
          </>
        ) : (
          <div className="text-xs text-gray-500 italic">
            No tiene terapia registrada aún
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-[0.7rem] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-sm border whitespace-nowrap ${normalizedPaciente.tieneCitasPendientes
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-gray-100 text-gray-700 border-gray-200'
            }`}
        >
          {normalizedPaciente.tieneCitasPendientes ? 'Citas pendientes' : 'Sin citas pendientes'}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <h1>Creación: </h1>
        <Phone size={12} />
        {formatDate(normalizedPaciente.fechaCreacionHistorial)}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <h1>Telefono: </h1>
        <Phone size={12} />
        <span>{telefono}</span>
      </div>

      <div className="flex justify-between border-t pt-3">
        <Link
          to={`/historial-clinico/${paciente.id}`}
          className="text-xs text-primary-color font-medium hover:underline"
        >
          Ver historia clínica
        </Link>
      </div>
    </div>
  );
};

TarjetaPaciente.propTypes = {
  paciente: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombre: PropTypes.string,
    nombrePaciente: PropTypes.string,
    correo: PropTypes.string,
    email: PropTypes.string,
    estado: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    telefono: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fechaCreacionHistorial: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    ultimaVisita: PropTypes.string,
    sesionesCompletadas: PropTypes.number,
    sesionesTotales: PropTypes.number,
    porcentajeTerapia: PropTypes.number,
    progreso: PropTypes.number,
    tieneCitasPendientes: PropTypes.bool
  })
};

export default TarjetaPaciente;