import { useState, useEffect } from 'react';

const useTerapiaState = (pacienteId) => {
  // Cargar estado inicial desde localStorage
  const loadState = () => {
    try {
      const saved = localStorage.getItem(`terapia-${pacienteId}`);
      return saved ? JSON.parse(saved) : {
        terapiaPrincipal: null,
        sesiones: []
      };
    } catch (error) {
      console.error("Error al cargar terapia:", error);
      return {
        terapiaPrincipal: null,
        sesiones: []
      };
    }
  };

  const [terapiaState, setTerapiaState] = useState(loadState);

  // Persistir cambios en localStorage
  useEffect(() => {
    localStorage.setItem(`terapia-${pacienteId}`, JSON.stringify(terapiaState));
  }, [pacienteId, terapiaState]);

  // Métodos para actualizar el estado
  const setTerapiaPrincipal = (terapia) => {
    setTerapiaState(prev => ({
      ...prev,
      terapiaPrincipal: terapia
    }));
  };

  const setSesiones = (sesiones) => {
    setTerapiaState(prev => ({
      ...prev,
      sesiones
    }));
  };

  const addSesion = (nuevaSesion) => {
    setTerapiaState(prev => ({
      ...prev,
      sesiones: [...prev.sesiones, nuevaSesion]
    }));
  };

  return {
    terapiaData: terapiaState,
    setTerapiaPrincipal,
    setSesiones,
    addSesion
  };
};

export default useTerapiaState;