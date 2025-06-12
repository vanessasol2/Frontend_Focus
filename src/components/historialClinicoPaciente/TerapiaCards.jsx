import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { crearTerapia, crearSesion, getTerapia, traerSesiones } from '../../service/terapiaService';
import useTerapiaState from '../../hook/useTerapiaState';
import Terapia from './Terapia';
import Sesiones from './Sesiones';

const TerapiaCards = ({ pacienteId, compact = false }) => {
  const {
    terapiaData: pacienteTerapias,
    setTerapiaPrincipal,
    addSesion,
    addTerapia,
    setSesiones,
    setAllTerapias 
  } = useTerapiaState(pacienteId);

  const [loading, setLoading] = useState({ terapias: true, sesiones: true });
  const [error, setError] = useState(null);
  const [modals, setModals] = useState({
    sesion: false,
    terapia: false
  });
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(prev => ({ ...prev, terapias: true }));
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
          
        await cargarSesiones(pacienteId);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(prev => ({ ...prev, terapias: false }));
      }
    };

    if (pacienteId) cargarDatos();
  }, [pacienteId]);

  const cargarSesiones = async (pacienteId) => {
    try {
      setLoading(prev => ({ ...prev, sesiones: true }));
      const sesionesData = await traerSesiones( pacienteId );
          console.log('Sesiones recibidas:', sesionesData); 

      setSesiones(sesionesData);
    } catch (err) {
      console.error('Error al cargar sesiones:', err);
      setError(err.message || 'Error al cargar las sesiones');
    } finally {
      setLoading(prev => ({ ...prev, sesiones: false }));
    }
  };

  const handleSelectTerapia = async (terapia) => {
    setTerapiaPrincipal(terapia);
    setTerapiaSeleccionada(terapia);
    await cargarSesiones(terapia.id);
  };

  const handleCrearTerapia = async (terapiaData) => {
    try {
      const terapiaCompleta = {
        ...terapiaData,
        idPaciente: pacienteId,
        estado: 'En progreso'
      };

      const terapiaCreada = await crearTerapia(pacienteId, terapiaData);
      addTerapia(terapiaCreada);
      setTerapiaPrincipal(terapiaCreada);
      setTerapiaSeleccionada(terapiaCreada);
      
      await cargarSesiones(terapiaCreada.id);
      
      setModals(prev => ({ ...prev, terapia: false }));
      setError(null);
    } catch (err) {
      console.error('Error al crear terapia:', err);
      setError(err.response?.data?.message || err.message || 'Error al crear la terapia');
    }
  };



const manejarNuevaSesion = async (nuevaSesion) => {
  try {
    if (!terapiaSeleccionada) {
      throw new Error('No hay terapia seleccionada');
    }

    const sesionConTerapia = {
      ...nuevaSesion,
      idTerapia: terapiaSeleccionada.id,
      idPaciente: pacienteId
    };

    const sesionCreada = await crearSesion(sesionConTerapia);
    addSesion(sesionCreada);
    setModals(prev => ({ ...prev, sesion: false }));

    toast.success("Sesión creada correctamente");
    
  } catch (error) {
    console.error('Error al crear la sesión:', error);

    const mensajeError = error.response?.data?.message || 'Error al crear la sesión';

    toast.error(mensajeError);

    setError(mensajeError);
  }
};


  const toggleModal = (modalName, isOpen) => {
    setModals(prev => ({ ...prev, [modalName]: isOpen }));
  };

  if (loading.terapias) {
    return <div className="loading-spinner">Cargando terapias...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="terapia-sesion-container">
      <Terapia
        pacienteId={pacienteId}
        terapias={pacienteTerapias.allTerapias || []}
        terapiaPrincipal={pacienteTerapias.terapiaPrincipal}
        compact={compact}
        onShowModal={() => toggleModal('terapia', true)}
        handleCrearTerapia={handleCrearTerapia}
        onCloseModal={() => toggleModal('terapia', false)}
        showModal={modals.terapia}
        onSelectTerapia={handleSelectTerapia}
      />

      {terapiaSeleccionada && (
        <Sesiones
          sesiones={pacienteTerapias.sesiones || []}
          terapiaPrincipal={terapiaSeleccionada}
          compact={false}
          onCrearSesion={() => toggleModal('sesion', true)}
          modalOpen={modals.sesion}
          onCloseModal={() => toggleModal('sesion', false)}
          terapiaSeleccionada={terapiaSeleccionada}
          onManejarNuevaSesion={manejarNuevaSesion}
          loading={loading.sesiones}
        />
      )}
    </div>
  );
};

export default TerapiaCards;