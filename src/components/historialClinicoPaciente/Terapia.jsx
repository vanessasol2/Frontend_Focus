import React from 'react';
import { PlusIcon } from 'lucide-react';
import ModalNuevaTerapia from './ModalNuevaTerapia';

const Terapia = ({
  terapias = [], 
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
  if (!status) return { bg: 'bg-gray-100', text: 'text-gray-800' }; 
  
  const normalizedStatus = status.toLowerCase().replace(/_/g, ' ').trim();

  const colors = {
    'en progreso': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'completada': { bg: 'bg-green-100', text: 'text-green-800' },
    'cancelada': { bg: 'bg-red-100', text: 'text-red-800' },
  };

  return colors[normalizedStatus] || { bg: 'bg-gray-100', text: 'text-gray-800' };
};

  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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

      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        {terapias.length === 0 ? (
          <p className="text-gray-500">No hay terapias registradas</p>
        ) : (
          <div className="space-y-4">
            {terapias.map((terapia) => (
              <div key={terapia.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                    {terapia.descripcion || 'Terapia sin nombre'}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(terapia.estado).bg} ${getStatusColor(terapia.estado).text}`}>
                    {compact ? terapia.estado?.substring(0, 3) : terapia.estado}
                  </span>
                </div>

                <div className={`bg-gray-50 rounded-lg ${compact ? 'p-2' : 'p-4'} border border-gray-200`}>
                  <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 md:grid-cols-4 gap-4'}`}>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
                      <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                        {tipoTerapiaMap[terapia.tipoTerapia?.toLowerCase()] || "No especificado"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sesiones</p>
                      <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                        {terapia.numeroSesiones || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider"> Fecha Inicio</p>
                      <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                        {formatDate(terapia.fechaInicio)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</p>
                      <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                        {formatDate(terapia.fechaFin)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
