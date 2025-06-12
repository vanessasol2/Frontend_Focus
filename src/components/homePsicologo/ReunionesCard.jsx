import React from 'react';
import PropTypes from 'prop-types';

const ReunionesCard = ({ 
  nombrePaciente, 
  estado, 
  fechaSesion, 
  horaInicio, 
  horaFin,
  nombre,
}) => {
 
  const fechaFormateada = fechaSesion 
    ? new Date(...fechaSesion).toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Fecha no especificada';


  const horaInicioFormateada = horaInicio 
    ? `${horaInicio[0]}:${horaInicio[1].toString().padStart(2, '0')}`
    : '--:--';
  
  const horaFinFormateada = horaFin 
    ? `${horaFin[0]}:${horaFin[1].toString().padStart(2, '0')}`
    : '--:--';

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 cursor-pointer ">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{nombrePaciente || "Paciente no especificado"}</h3>
          <p className="text-sm text-gray-600 mb-2">{nombre || "Sin nombre de sesión"}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{horaInicioFormateada} - {horaFinFormateada}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{fechaFormateada}</span>
          </div>
          
        </div>
        
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 text-xs rounded-full mb-2 ${
            estado === 'COMPLETADA' ? 'bg-green-100 text-green-800' :
            estado === 'CANCELADA' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {estado || 'PENDIENTE'}
          </span>
        </div>
      </div>
    </div>
  );
};

ReunionesCard.propTypes = {
  nombrePaciente: PropTypes.string,
  estado: PropTypes.string,
  fechaSesion: PropTypes.array,
  horaInicio: PropTypes.array,
  horaFin: PropTypes.array,
  nombre: PropTypes.string,
};

export default ReunionesCard;