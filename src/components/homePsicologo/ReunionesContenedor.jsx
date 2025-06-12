import React, { useEffect, useState } from 'react';
import { traerSesionesCard } from '../../service/terapiaService';
import ReunionesCard from './ReunionesCard';

const ReunionesContenedor = () => {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerSesiones = async () => {
      try {
        const data = await traerSesionesCard();
        console.log("Datos recibidos:", data);
        setSesiones(data);
      } catch (err) {
        setError('Error al cargar las sesiones');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    obtenerSesiones();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error} - Intenta recargar la página
      </div>
    );
  }

  return (
    <div >
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Sesiones Programadas</h1>

      {sesiones.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay sesiones programadas
        </div>
      ) : (
        <div className="space-y-4">
          {sesiones.map((sesion) => (
            <ReunionesCard
              key={sesion.id}
              nombrePaciente={sesion.nombrePaciente}
              estado={sesion.estado}
              fechaSesion={sesion.fechaSesion}
              horaInicio={sesion.horaInicio}
              horaFin={sesion.horaFin}
              nombre={sesion.nombre}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReunionesContenedor;