import React, { useState } from 'react';
import { PlusIcon, CheckCircle } from 'lucide-react';
import ModalNuevaTerapia from './ModalNuevaTerapia';
import { finalizarTerapia } from '../../service/terapiaService';

const Terapia = ({
  terapias = [],
  compact,
  onShowModal,
  onCloseModal,
  handleCrearTerapia,
  showModal,
  onTerapiaFinalizada
}) => {
  const [loadingId, setLoadingId] = useState(null);
  const [terapiaAFinalizar, setTerapiaAFinalizar] = useState(null);

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

  const handleFinalizarTerapia = async (terapiaId) => {
    setLoadingId(terapiaId);
    try {
      const datosFinalizacion = {
        fechaFin: new Date().toISOString(),
        estado: 'COMPLETADA'
      };

      await finalizarTerapia(terapiaId, datosFinalizacion);

      if (onTerapiaFinalizada) {
        onTerapiaFinalizada(terapiaId, datosFinalizacion);
      }

    } catch (error) {
      console.error("Error al finalizar terapia:", error);
    } finally {
      setLoadingId(null);
      setTerapiaAFinalizar(null);
    }
  };

  const confirmarFinalizacion = (terapiaId) => {
    setTerapiaAFinalizar(terapiaId);
  };

  const cancelarFinalizacion = () => {
    setTerapiaAFinalizar(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`px-4 ${compact ? 'py-3' : 'py-4'} border-b border-gray-100 bg-gray-50 flex justify-between items-center`}>
        <h2 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>Terapias</h2>
        <button
          onClick={() => onShowModal(true)}
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
            {terapias.map((terapia) => {
              const statusColor = getStatusColor(terapia.estado);
              const estaCargando = loadingId === terapia.id;
              const estadoNormalizado = terapia.estado?.toLowerCase();
              const estaFinalizada = estadoNormalizado === 'completada' || estadoNormalizado === 'cancelada';

              return (
                <div key={terapia.id} className="space-y-2 group">
                  <div className="flex items-center justify-between">
                    <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                      {terapia.descripcion || 'Terapia sin nombre'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                        {compact ? terapia.estado?.substring(0, 3) : terapia.estado}
                      </span>

                      <button
                        onClick={() => confirmarFinalizacion(terapia.id)}
                        disabled={estaCargando || estaFinalizada}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors${estaFinalizada ?
                            'bg-gray-100 text-gray-400 cursor-not-allowed' :
                            'bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
                          }${estaCargando ? 'opacity-70 cursor-wait' : ''}`}
                        title={estaFinalizada ? 'Terapia ya finalizada' : 'Finalizar terapia'}
                      >
                        {estaCargando ? (
                          <svg className="animate-spin h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            {!compact && <span> Deseas Finalizar Terapia</span>}
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`bg-gray-50 rounded-lg ${compact ? 'p-2' : 'p-4'} border border-gray-200`}>
                    <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 md:grid-cols-4 gap-4'}`}>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
                        <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                          {tipoTerapiaMap[terapia?.tipoTerapia?.toLowerCase()] || "No especificado"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sesiones</p>
                        <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900`}>
                          {terapia.numeroSesiones || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</p>
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
              )
            })}
          </div>
        )}

        {/* Modal de Confirmación */}
        {terapiaAFinalizar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmar Finalización</h3>
              <p className="text-gray-600 mb-6">¿Estás seguro de que deseas finalizar esta terapia? Esta acción no se puede deshacer.</p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelarFinalizacion}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleFinalizarTerapia(terapiaAFinalizar)}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  {loadingId === terapiaAFinalizar ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finalizando...
                    </>
                  ) : (
                    'Sí, Finalizar'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <ModalNuevaTerapia
          isOpen={showModal}
          onClose={onCloseModal}
          onSubmit={handleCrearTerapia}
        />

      </div>
    </div>
  );
};

export default Terapia;
