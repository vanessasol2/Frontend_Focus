import React from 'react';
import { Plus, FileText, ChevronRight } from 'lucide-react';
import ModalNuevaSesion from './ModalNuevaSesion';

const Sesiones = ({ 
  sesiones, 
  terapiaPrincipal,
  compact, 
  onCrearSesion,
  modalOpen,
  onCloseModal,
  terapiaSeleccionada,
  onManejarNuevaSesion
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
      {/* Contenido */}
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        {/* Tabla de sesiones */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>Sesiones</h3>
            <span className="text-xs font-medium text-gray-500">{sesiones.length} {compact ? 'ses' : 'sesiones'}</span>
          </div>

          {sesiones.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Notas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sesiones.map((sesion) => (
                    <tr key={sesion.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{formatDate(sesion.fechaSesion)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-gray-800">{formatTime(sesion.horaInicio)}</span>
                          <span className="text-xs text-gray-500 mt-0.5">a {formatTime(sesion.horaFin)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                          {sesion.nombre}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700 line-clamp-2 max-w-xs" title={sesion.notasAdicionales}>
                          {sesion.notasAdicionales || '-'}
                        </div>
                        {sesion.notasAdicionales && (
                          <button className="text-violet-600 hover:text-violet-800 text-xs font-medium mt-1.5 flex items-center transition-colors">
                            Ver detalles
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={`bg-gray-50 rounded-lg ${compact ? 'p-4' : 'p-8'} text-center border border-gray-200`}>
              <FileText className={`${compact ? 'h-8 w-8' : 'h-12 w-12'} mx-auto text-gray-400`} />
              <h3 className={`mt-2 ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                No hay sesiones registradas
              </h3>
              {!compact && <p className="mt-1 text-sm text-gray-500">Agregue una nueva sesión para comenzar</p>}
              <div className={`${compact ? 'mt-3' : 'mt-6'}`}>
                <button
                  onClick={onCrearSesion}
                  className={`inline-flex items-center ${compact ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} border border-transparent shadow-sm font-medium rounded-md text-white bg-primary-color hover:bg-secundary-color`}
                >
                  <Plus className={`${compact ? '-ml-0.5 mr-1 h-3 w-3' : '-ml-1 mr-2 h-5 w-5'}`} />
                  {compact ? 'Agregar' : 'Nueva Sesión'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalNuevaSesion
        open={modalOpen}
        onClose={onCloseModal}
        onSubmit={onManejarNuevaSesion}
        terapia={terapiaSeleccionada}
      />
    </div>
  );
};

export default Sesiones;