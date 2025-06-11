import React, { useState, useEffect } from 'react';
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
    setAllTerapias 
  } = useTerapiaState(pacienteId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTerapiaModal, setShowTerapiaModal] = useState(false);
  const navigate = useNavigate();

  const [sesiones, setLocalSesiones] = useState([]); 

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);

        const terapias = await getTerapia(pacienteId);
        console.log('Terapias recibidas:', terapias); 

        if (!terapias || !Array.isArray(terapias)) {
          throw new Error('Formato de datos inválido');
        }

        setAllTerapias(terapias);

        if (terapias.length > 0) {
          const terapiaPrincipal = terapias[0];
          setTerapiaPrincipal(terapiaPrincipal);
          setTerapiaSeleccionada(terapiaPrincipal); 

          const sesiones = await traerSesiones({ terapiaId: terapiaPrincipal.id });
          setSesiones(sesiones);
          setLocalSesiones(sesiones);
        } else {
          setTerapiaPrincipal(null);
          setSesiones([]);
          setLocalSesiones([]);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    if (pacienteId) cargarDatos();
  }, [pacienteId]);

 const handleCrearTerapia = async (terapiaData) => {
  try {
    const terapiaCompleta = {
      ...terapiaData,
      idPaciente: pacienteId,
      estado: 'En progreso'
    };

    await crearTerapia(terapiaCompleta);

    const terapiasActualizadas = await getTerapia(pacienteId);
    setAllTerapias(terapiasActualizadas);

    if (terapiasActualizadas.length > 0) {
      const terapiaPrincipal = terapiasActualizadas[0];
      setTerapiaPrincipal(terapiaPrincipal);
      setTerapiaSeleccionada(terapiaPrincipal);

      const nuevasSesiones = await traerSesiones({ terapiaId: terapiaPrincipal.id });
      setSesiones(nuevasSesiones);
      setLocalSesiones(nuevasSesiones);
    }

    setShowTerapiaModal(false);
    setError(null);
  } catch (err) {
    console.error('Error al crear terapia:', err);
    setError(err.response?.data?.message || err.message || 'Error al crear la terapia');
  }
};


  const abrirModal = () => {
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const manejarNuevaSesion = async (nuevaSesion) => {
    try {
      const sesionConTerapia = {
        ...nuevaSesion,
        terapiaId: terapiaSeleccionada.id, 
      };

      const sesionCreada = await crearSesion(sesionConTerapia)
      setLocalSesiones(prev => [...prev, sesionCreada]); 
      cerrarModal();
    } catch (error) {
      console.error('Error al crear la sesión:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <Terapia
        pacienteId={pacienteId}  
        terapias={pacienteTerapias.allTerapias || []}
        terapiaPrincipal={pacienteTerapias.terapiaPrincipal}
        compact={compact}
        onShowModal={() => setShowTerapiaModal(true)}
        handleCrearTerapia={handleCrearTerapia}
        onClose={() => setShowModal(false)}
         showModal={showTerapiaModal}
        onSelectTerapia={(terapia) => {
          setTerapiaPrincipal(terapia);
          setTerapiaSeleccionada(terapia);
        }}
      />

      <Sesiones
        sesiones={sesiones}
        terapiaPrincipal={terapiaSeleccionada}
        compact={false}
        onCrearSesion={abrirModal} 
        modalOpen={modalOpen}
        onCloseModal={cerrarModal}
        terapiaSeleccionada={terapiaSeleccionada}
        onManejarNuevaSesion={manejarNuevaSesion}
      />
    </>
  );
};

export default TerapiaCards;
