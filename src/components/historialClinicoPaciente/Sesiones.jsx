import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import ModalNuevaSesion from './ModalNuevaSesion';
import { finalizarSesion, cancelarSesion } from '../../service/terapiaService';
import { CheckCircle, XCircle } from 'lucide-react';

const Sesiones = ({
  sesiones,
  compact,
  onCrearSesion,
  modalOpen,
  onCloseModal,
  terapiaSeleccionada,
  onManejarNuevaSesion,
  onSesionesActualizadas
}) => {
  const [loadingFinalizar, setLoadingFinalizar] = useState(null);
  const [loadingCancelar, setLoadingCancelar] = useState(null);

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

  const handleFinalizarSesion = async (idSesion) => {
    setLoadingFinalizar(idSesion);
    try {
      const datosFinalizacion = {
        fechaFin: new Date().toISOString(),
        estado: 'FINALIZADA'
      };
      await finalizarSesion(idSesion, datosFinalizacion);
      alert('Sesión finalizada correctamente');
      if (onSesionesActualizadas) onSesionesActualizadas();
    } catch (error) {
      alert('Error al finalizar la sesión');
      console.error(error);
    } finally {
      setLoadingFinalizar(null);
    }
  };

  const handleCancelarSesion = async (idSesion) => {
    setLoadingCancelar(idSesion);
    try {
      const datosCancelacion = {
        fechaFin: new Date().toISOString(),
        estado: 'CANCELADA'
      };
      await cancelarSesion(idSesion, datosCancelacion);
      alert('Sesión cancelada correctamente');
      if (onSesionesActualizadas) onSesionesActualizadas();
    } catch (error) {
      alert('Error al cancelar la sesión');
      console.error(error);
    } finally {
      setLoadingCancelar(null);
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
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
                      <td className="px-6 py-4">
                        {(sesion.estado?.toUpperCase() !== 'FINALIZADA' && sesion.estado?.toUpperCase() !== 'CANCELADA') && (
                          <>
                            <button
                              disabled={loadingFinalizar === sesion.id}
                              onClick={() => handleFinalizarSesion(sesion.id)}
                              className={`
    
                                flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all
    ${loadingFinalizar === sesion.id ?
                                  'bg-green-200 text-green-800 cursor-wait' :
                                  'bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-md'
                                }
    disabled:opacity-70 disabled:cursor-not-allowed
  `}
                            >
                              {loadingFinalizar === sesion.id ? (
                                <>
                                  <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Finalizando...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-3 w-3" />
                                  Finalizar
                                </>
                              )}
                            </button>

                            <button
                              disabled={loadingCancelar === sesion.id}
                              onClick={() => handleCancelarSesion(sesion.id)}
                              className={`
                              flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                              ${loadingCancelar === sesion.id ?
                                  'bg-gray-200 text-gray-800 cursor-wait' :
                                  'bg-gray-500 text-white hover:bg-gray-600 shadow-sm hover:shadow-md'
                                }
                                 disabled:opacity-70 disabled:cursor-not-allowed
                              `}
                            >
                              {loadingCancelar === sesion.id ? (
                                <>
                                  <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Cancelando...
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3" />
                                  Cancelar
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </td>
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
