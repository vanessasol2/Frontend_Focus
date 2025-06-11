import React from 'react';
import { Plus, FileText } from 'lucide-react';
import ModalNuevaSesion from './ModalNuevaSesion';

const Sesiones = ({
  sesiones,
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

  const formatTime = (timeArray) => {
    if (!timeArray || !Array.isArray(timeArray)) return '-';
    const hours = (timeArray[0] ?? 0).toString().padStart(2, '0');
    const minutes = (timeArray[1] ?? 0).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getEstadoStyles = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMADA':
        return 'bg-green-100 text-green-800';
      case 'CANCELADA':
        return 'bg-red-100 text-red-800';
      case 'FINALIZADA':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>Sesiones</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">{sesiones.length} sesiones</span>
              <button
                onClick={onCrearSesion}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md text-white bg-primary-color hover:bg-secundary-color"
              >
                <Plus className="h-4 w-4" /> Nueva
              </button>
            </div>
          </div>

          {sesiones.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hora Inicio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hora Fin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Consulta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Notas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sesiones.map((sesion) => (
                    <tr key={sesion.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{formatDate(sesion.fechaSesion)}</td>
                      <td className="px-6 py-4">{formatTime(sesion.horaInicio)}</td>
                      <td className="px-6 py-4">{formatTime(sesion.horaFin)}</td>
                      <td className="px-6 py-4">{sesion.nombre || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoStyles(sesion.estado)}`}>
                          {sesion.estado?.toLowerCase() || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{sesion.notasAdicionales || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay sesiones registradas</h3>
              <p className="mt-1 text-sm text-gray-500">Agregue una nueva sesión para comenzar</p>
            </div>
          )}
        </div>
      </div>

      <ModalNuevaSesion
        isOpen={modalOpen}
        onClose={onCloseModal}
        onSubmit={onManejarNuevaSesion}
        idPaciente={terapiaSeleccionada?.idPaciente}
        idTerapia={terapiaSeleccionada?.id}
      />
    </div>
  );
};

export default Sesiones;
