import React from 'react';
import { PlusIcon } from 'lucide-react';
import ModalNuevaTerapia from './ModalNuevaTerapia';

const Terapia = ({ 
  terapiaPrincipal, 
  compact, 
  onShowModal, 
  handleCrearTerapia,
  showModal 
}) => {
  const tipoTerapiaMap = {
    familiar: "Terapia Familiar",
    grupal: "Terapia Grupal",
    individual: "Terapia Individual",
    pareja: "Terapia de Pareja",
    infantil: "Terapia Infantil"
  };

  const getStatusColor = (status) => {
    const colors = {
      'En progreso': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'Completada': { bg: 'bg-green-100', text: 'text-green-800' },
      'Cancelada': { bg: 'bg-red-100', text: 'text-red-800' }
    };
    return colors[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Encabezado */}
      <div className={`px-4 ${compact ? 'py-3' : 'py-4'} border-b border-gray-100 bg-gray-50 flex justify-between items-center`}>
        <h2 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>Terapias</h2>
        <button
          onClick={onShowModal}
          className={`bg-primary-color hover:bg-secundary-color text-white ${compact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} rounded-lg font-medium flex items-center gap-1`}
        >
          <PlusIcon className="h-3 w-3" />
          {compact ? 'Nueva' : 'Nueva Terapia'}
        </button>
      </div>

      {/* Contenido */}
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        {/* Terapia principal */}
        {terapiaPrincipal && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                {compact ? 'Terapia' : 'Terapia Principal'}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(terapiaPrincipal.estado).bg} ${getStatusColor(terapiaPrincipal.estado).text}`}>
                {compact ? terapiaPrincipal.estado.substring(0, 3) : terapiaPrincipal.estado}
              </span>
            </div>

            <div className={`bg-gray-50 rounded-lg ${compact ? 'p-2' : 'p-4'} border border-gray-200`}>
              <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 md:grid-cols-4 gap-4'}`}>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</p>
                  <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                    {terapiaPrincipal.descripcion}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Período</p>
                  <div className={`flex flex-col ${compact ? 'text-xs' : 'text-sm'} text-gray-900 font-medium space-y-0.5`}>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Inicio:</span>
                      <span>{formatDate(terapiaPrincipal.fechaInicio)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Fin:</span>
                      <span>{formatDate(terapiaPrincipal.fechaFin)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
                  <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                    {tipoTerapiaMap[terapiaPrincipal.tipoTerapia?.toLowerCase()] || "No especificado"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {compact ? 'Ses.' : 'Sesiones'}
                  </p>
                  <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                    {terapiaPrincipal.numeroSesiones}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <ModalNuevaTerapia
          isOpen={showModal}
          onClose={() => onShowModal(false)}
          onSubmit={handleCrearTerapia}
        />
      </div>
    </div>
  );
};

export default Terapia;