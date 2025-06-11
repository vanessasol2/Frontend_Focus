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
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>Sesiones</h3>
            <span className="text-xs font-medium text-gray-500">{sesiones.length} sesiones</span>
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
                      <td className="px-6 py-4">{formatDate(sesion.fechaSesion)}</td>
                      <td className="px-6 py-4">{formatTime(sesion.horaInicio)} - {formatTime(sesion.horaFin)}</td>
                      <td className="px-6 py-4">{sesion.nombre}</td>
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
              <div className="mt-6">
                <button
                  onClick={onCrearSesion}
                  className="px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-primary-color hover:bg-secundary-color"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" /> Nueva Sesión
                </button>
              </div>
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
