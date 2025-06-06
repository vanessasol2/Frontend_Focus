import React from 'react';

const TerapiaCards = ({ pacienteId }) => {
  
  const terapiasData = {
    1: {
      terapiaPrincipal: {
        id: 1,
        descripcion: "Terapia de manejo de estrés",
        fechaInicio: "2025-05-01",
        fechaFin: "2025-05-30",
        tipoTerapia: "grupal",
        numeroSesiones: 10,
        estado: "En progreso"
      },
      sesiones: [
        {
          id: 1,
          nombre: "Consulta de Pareja",
          fechaSesion: "2025-03-01",
          horaInicio: "06:00:00",
          horaFin: "07:00:00",
          tipo: "Individual",
          terapeuta: "Dra. Sara Pérez",
          notasAdicionales: "Evaluación inicial del paciente y establecimiento de objetivos terapéuticos",
          estado: "Completada"
        },
        {
          id: 2,
          nombre: "Sesión Grupal",
          fechaSesion: "2025-03-08",
          horaInicio: "10:00:00",
          horaFin: "12:00:00",
          tipo: "Grupal",
          terapeuta: "Dr. Juan Gómez",
          notasAdicionales: "Técnicas de relajación y manejo de ansiedad",
          estado: "Completada"
        },
        {
          id: 3,
          nombre: "Seguimiento",
          fechaSesion: "2025-03-15",
          horaInicio: "09:00:00",
          horaFin: "10:00:00",
          tipo: "Individual",
          terapeuta: "Dra. Sara Pérez",
          notasAdicionales: "Revisión de progreso y ajuste de tratamiento",
          estado: "Programada"
        }
      ]
    }
  };

  const pacienteTerapias = terapiasData[pacienteId] || {};

  // Funciones auxiliares para formatear fechas y horas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('es-ES', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month}’${year}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completada':
        return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' };
      case 'En progreso':
        return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' };
      case 'Programada':
        return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' };
      case 'Cancelada':
        return { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Terapias</h2>
          <p className="flex items-center gap-1 text-gray-900 text-xs mt-1">ID Paciente: {pacienteId}</p>
        </div>
        <button className="bg-primary-color hover:bg-secundary-color text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Terapia
        </button>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-6">
        {/* Terapia Principal */}
        {pacienteTerapias.terapiaPrincipal && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">Terapia Principal</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pacienteTerapias.terapiaPrincipal.estado).bg} ${getStatusColor(pacienteTerapias.terapiaPrincipal.estado).text}`}>
                {pacienteTerapias.terapiaPrincipal.estado}
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</p>
                  <p className="text-sm font-medium text-gray-900">{pacienteTerapias.terapiaPrincipal.descripcion}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Período</p>
                  <p className="text-sm font-medium text-gray-900">{`${formatDate(pacienteTerapias.terapiaPrincipal.fechaInicio)} - ${formatDate(pacienteTerapias.terapiaPrincipal.fechaFin)}`}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{pacienteTerapias.terapiaPrincipal.tipoTerapia}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sesiones</p>
                  <p className="text-sm font-medium text-gray-900">{pacienteTerapias.terapiaPrincipal.numeroSesiones}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sesiones */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800">Sesiones</h3>
            <span className="text-xs font-medium text-gray-500">{pacienteTerapias.sesiones?.length || 0} sesiones</span>
          </div>
          
          {pacienteTerapias.sesiones?.length > 0 ? (
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terapeuta</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notas</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pacienteTerapias.sesiones.map((sesion) => {
                    const statusColors = getStatusColor(sesion.estado);
                    return (
                      <tr key={sesion.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatDate(sesion.fechaSesion)}</div>
                          <div className="text-sm text-gray-500">{formatTime(sesion.horaInicio)} - {formatTime(sesion.horaFin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${sesion.tipo === 'Individual' ? 'bg-purple-100 text-purple-800' : 'bg-cyan-100 text-cyan-800'}`}>
                            {sesion.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{sesion.terapeuta}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                            {sesion.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 line-clamp-1" title={sesion.notasAdicionales}>
                            {sesion.notasAdicionales}
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-900 text-xs font-medium mt-1 inline-flex items-center">
                            Ver detalles
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay sesiones registradas</h3>
              <p className="mt-1 text-sm text-gray-500">Agregue una nueva sesión para comenzar</p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nueva Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerapiaCards;