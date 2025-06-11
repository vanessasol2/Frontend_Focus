import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearTerapia, crearSesion, getTerapia, traerSesiones } from '../../service/terapiaService';
import useTerapiaState from '../../hook/useTerapiaState';
import Terapia from './Terapia';
import Sesiones from './Sesiones';

const TerapiaCards = ({ pacienteId, compact = false }) => {
  const {
    terapiaData: pacienteTerapias,
    setTerapiaPrincipal,
    addSesion,
    setSesiones,
    setAllTerapias,
    isLoading
  } = useTerapiaState(pacienteId);

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState(null);
  const [showTerapiaModal, setShowTerapiaModal] = useState(false);
  const navigate = useNavigate();

  const cargarTerapias = useCallback(async () => {
    try {
      setError(null);
      const terapias = await getTerapia(pacienteId);
      
      if (!terapias || !Array.isArray(terapias)) {
        throw new Error('Formato de datos inválido');
      }

      setAllTerapias(terapias);

      if (terapias.length > 0) {
        const terapiaPrincipal = terapias[0];
        setTerapiaPrincipal(terapiaPrincipal);
        setTerapiaSeleccionada(terapiaPrincipal);
        return terapiaPrincipal;
      }
      return null;
    } catch (err) {
      console.error('Error al cargar terapias:', err);
      setError(err.message || 'Error al cargar los datos');
      throw err;
    }
  }, [pacienteId, setAllTerapias, setTerapiaPrincipal]);

  const cargarSesiones = useCallback(async (terapiaId) => {
    try {
      const sesiones = await traerSesiones({ terapiaId });
      setSesiones(sesiones);
    } catch (err) {
      console.error('Error al cargar sesiones:', err);
      setError(err.message || 'Error al cargar las sesiones');
      throw err;
    }
  }, [setSesiones]);

  useEffect(() => {
    if (!pacienteId) return;

    const cargarDatosCompletos = async () => {
      try {
        const terapiaPrincipal = await cargarTerapias();
        if (terapiaPrincipal) {
          await cargarSesiones(terapiaPrincipal.id);
        }
      } catch (err) {
        console.error('Error general:', err);
      }
    };

    cargarDatosCompletos();
  }, [pacienteId, cargarTerapias, cargarSesiones]);

  const handleCrearTerapia = async (terapiaData) => {
    try {
      const terapiaCompleta = {
        ...terapiaData,
        idPaciente: pacienteId,
        estado: 'En progreso'
      };

      await crearTerapia(terapiaCompleta);
      const terapiaPrincipal = await cargarTerapias();
      
      if (terapiaPrincipal) {
        await cargarSesiones(terapiaPrincipal.id);
      }

      setShowTerapiaModal(false);
      setError(null);
    } catch (err) {
      console.error('Error al crear terapia:', err);
      setError(err.response?.data?.message || err.message || 'Error al crear la terapia');
    }
  };

  const manejarNuevaSesion = async (nuevaSesion) => {
    try {
      const sesionConTerapia = {
        ...nuevaSesion,
        idPaciente: pacienteId,   
        idTerapia: terapiaSeleccionada.id
      };

      const sesionCreada = await crearSesion(sesionConTerapia);
      addSesion(sesionCreada); 
      cerrarModal();
    } catch (error) {
      console.error('Error al crear la sesión:', error);
      setError(error.message || 'Error al crear la sesión');
    }
  };

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  if (isLoading) return <div className="loading-spinner">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <Terapia
        pacienteId={pacienteId}  
        terapias={pacienteTerapias.allTerapias || []}
        terapiaPrincipal={pacienteTerapias.terapiaPrincipal}
        compact={compact}
        onShowModal={() => setShowTerapiaModal(true)}
        handleCrearTerapia={handleCrearTerapia}
        onClose={() => setShowTerapiaModal(false)}
        showModal={showTerapiaModal}
        onSelectTerapia={async (terapia) => {
          setTerapiaPrincipal(terapia);
          setTerapiaSeleccionada(terapia);
          await cargarSesiones(terapia.id);
        }}
      />

      <Sesiones
        sesiones={pacienteTerapias.sesiones}  
        terapiaPrincipal={terapiaSeleccionada}
        compact={false}
        onCrearSesion={abrirModal} 
        modalOpen={modalOpen}
        onCloseModal={cerrarModal}
        terapiaSeleccionada={terapiaSeleccionada}
        onManejarNuevaSesion={manejarNuevaSesion}
        idPaciente={pacienteId}
      />
    </>
  );
};

export default TerapiaCards;