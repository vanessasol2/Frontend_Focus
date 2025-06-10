import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearTerapia, crearSesion } from '../../service/terapiaService';
import useTerapiaState from '../../hook/useTerapiaState';
import Terapia from './Terapia';
import Sesiones from './Sesiones';

const TerapiaCards = ({ pacienteId, compact = false }) => {
  const {
    terapiaData: pacienteTerapias,
    setTerapiaPrincipal,
    addSesion
  } = useTerapiaState(pacienteId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const abrirModal = (terapia) => {
    setTerapiaSeleccionada(terapia);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setTerapiaSeleccionada(null);
  };

  const manejarNuevaSesion = (datosSesion) => {
    console.log('Datos sesión nueva:', datosSesion);
    cerrarModal();
  };

  const handleUnauthorized = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { state: { from: 'expired' } });
  };

  const handleCrearTerapia = async (terapiaData) => {
    try {
      const terapiaCompleta = {
        ...terapiaData,
        idPaciente: pacienteId,
        estado: 'En progreso'
      };

      const terapiaCreada = await crearTerapia(terapiaCompleta);

      setTerapiaPrincipal(terapiaCreada);

      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error('Error al crear terapia:', err);
      if (err.message.includes('Token inválido') || err.response?.status === 401) {
        handleUnauthorized();
      } else {
        setError(err.message || 'Error al crear la terapia');
      }
    }
  };

  const handleCrearSesion = async () => {
    try {
      if (!pacienteTerapias.terapiaPrincipal) {
        throw new Error('Debe existir una terapia principal para crear sesiones');
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        handleUnauthorized();
        return;
      }

      const nuevaSesion = {
        idTerapia: pacienteTerapias.terapiaPrincipal.id,
        fechaSesion: new Date().toISOString().split('T')[0],
        horaInicio: '10:00',
        horaFin: '11:00',
        nombre: 'Sesión ' + (pacienteTerapias.sesiones.length + 1),
        notasAdicionales: ''
      };

      const sesionCreada = await crearSesion(nuevaSesion);

      addSesion(sesionCreada);

      setError(null);
    } catch (err) {
      console.error('Error al crear sesión:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleUnauthorized();
      } else {
        setError(err.response?.data?.message || err.message || 'Error al crear la sesión');
      }
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Terapia
        terapiaPrincipal={pacienteTerapias.terapiaPrincipal}
        compact={compact}
        onShowModal={() => setShowModal(true)}
        handleCrearTerapia={handleCrearTerapia}
        showModal={showModal}
      />
      
      <Sesiones
        sesiones={pacienteTerapias.sesiones}
        terapiaPrincipal={pacienteTerapias.terapiaPrincipal}
        compact={compact}
        onCrearSesion={handleCrearSesion}
        modalOpen={modalOpen}
        onCloseModal={cerrarModal}
        terapiaSeleccionada={terapiaSeleccionada}
        onManejarNuevaSesion={manejarNuevaSesion}
      />
    </>
  );
};

export default TerapiaCards;