import { useState, useEffect } from 'react';

const useTerapiaState = (pacienteId) => {
  const loadState = () => {
    try {
      const saved = localStorage.getItem(`terapia-${pacienteId}`);
      return saved ? JSON.parse(saved) : {
        allTerapias: [],       
        terapiaPrincipal: null,
        sesiones: []
      };
    } catch (error) {
      console.error("Error al cargar terapia:", error);
      return {
        allTerapias: [],
        terapiaPrincipal: null,
        sesiones: []
      };
    }
  };

  const [terapiaState, setTerapiaState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(`terapia-${pacienteId}`, JSON.stringify(terapiaState));
  }, [pacienteId, terapiaState]);

  const setAllTerapias = (terapias) => {
    setTerapiaState(prev => ({
      ...prev,
      allTerapias: Array.isArray(terapias) ? terapias : []
    }));
  };

  const setTerapiaPrincipal = (terapia) => {
    setTerapiaState(prev => ({
      ...prev,
      terapiaPrincipal: terapia
    }));
  };

  const setSesiones = (sesiones) => {
    setTerapiaState(prev => ({
      ...prev,
      sesiones: Array.isArray(sesiones) ? sesiones : []
    }));
  };

  const addSesion = (nuevaSesion) => {
    setTerapiaState(prev => ({
      ...prev,
      sesiones: [...prev.sesiones, nuevaSesion]
    }));
  };

  const addTerapia = (nuevaTerapia) => {
    setTerapiaState(prev => ({
      ...prev,
      allTerapias: [...prev.allTerapias, nuevaTerapia]
    }));
  };

  return {
    terapiaData: terapiaState,
    setAllTerapias,
    setTerapiaPrincipal,
    setSesiones,
    addSesion,
    addTerapia
  };
};

export default useTerapiaState;