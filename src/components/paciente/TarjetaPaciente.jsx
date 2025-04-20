import React from "react";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const ESTADOS = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo'
};

const ESTADO_CITAS = {
  PENDIENTES: 'Tiene citas pendientes',
  SIN_CITAS: 'Sin citas pendientes'
};

const TarjetaPaciente = ({ paciente }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
        <User className="text-primary-color" size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate" title={paciente.nombre}>{paciente.nombre}</p>
        <p className="text-xs text-gray-500 truncate" title={paciente.correo}>{paciente.correo}</p>
      </div>
      <div 
        className={`w-3 h-3 rounded-full ${paciente.estado === ESTADOS.ACTIVO ? 'bg-green-500' : 'bg-gray-400'}`}
        title={paciente.estado === ESTADOS.ACTIVO ? 'Activo' : 'Inactivo'}
      />
    </div>
    
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs text-gray-600 flex items-center gap-1">
        <Calendar size={14} />
        {paciente.ultimaVisita}
      </span>
      <span className={`text-xs px-4 py-1 rounded-full ml-2 ${
        paciente.tieneCitasPendientes 
          ? 'bg-amber-100 text-amber-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {paciente.tieneCitasPendientes ? ESTADO_CITAS.PENDIENTES : ESTADO_CITAS.SIN_CITAS}
      </span>
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

export default TarjetaPaciente;
