import React from 'react';
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import MainLayout from "../../layout/paciente/MainLayout";
import ModalCitaPsicologo from "../../components/citaPsicologo/ModalCitaPsicologo";
import CitaCard from "../../components/citaPaciente/CitaCard";

const CitasPaciente = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citas, setCitas] = useState([]);
  const [formulario, setFormulario] = useState({
    titulo: "",
    fecha: "",
    hora: "",
    notas: "",
  });
  const [error, setError] = useState("");
  const [psicologoId] = useState(1);

  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/citas/psicologo/${psicologoId}`);
        if (!response.ok) throw new Error('Error al cargar citas');
        
        const data = await response.json();
        
        const citasFormateadas = data.map(cita => ({
          id: cita.id,
          name: cita.paciente?.nombre || cita.titulo,
          date: new Date(cita.start).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          time: new Date(cita.start).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: cita.estado || "Confirmed" 
        }));
        
        setCitas(citasFormateadas);
      } catch (error) {
        console.error("Error cargando citas:", error);
        setError("Error al cargar las citas");
      }
    };
    
    cargarCitas();
  }, [psicologoId]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const agregarEvento = async () => {
    const { titulo, fecha, hora } = formulario;

    if (!titulo || !fecha || !hora) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      const inicio = new Date(`${fecha}T${hora}:00`);
      const fin = new Date(inicio.getTime() + 60 * 60 * 1000);

      const response = await fetch('http://localhost:8080/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: titulo,
          start: inicio.toISOString(),
          end: fin.toISOString(),
          notas: formulario.notas,
          psicologoId: psicologoId,
          agendadaPorPaciente: false 
        }),
      });

      if (!response.ok) throw new Error('Error al guardar la cita');

      const nuevaCita = await response.json();
      setCitas(prev => [...prev, {
        id: nuevaCita.id,
        name: titulo,
        date: inicio.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        time: inicio.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: "Confirmed"
      }]);

      setModalAbierto(false);
      setFormulario({
        titulo: "",
        fecha: "",
        hora: "",
        notas: "",
      });

    } catch (error) {
      console.error("Error:", error);
      setError("Error al guardar la cita");
    }
  };

  return (
    <MainLayout>
      <div className="p-4 mt-7">
        <h1 className="text-xl font-semibold text-gray-800">Gestión de Citas</h1>
        
        <div className="flex justify-end mt-4 mb-6">
          <button
            className="bg-primary-color text-white py-2 px-6 rounded-lg hover:bg-secundary-color transition-all duration-300 flex items-center gap-2"
            onClick={() => setModalAbierto(true)}
          >
            <CalendarDays className="w-5 h-5" />
            Agendar nueva cita
          </button>
        </div>

        {modalAbierto && (
          <ModalCitaPsicologo
            formulario={formulario}
            manejarCambio={manejarCambio}
            agregarEvento={agregarEvento}
            cerrarModal={() => {
              setModalAbierto(false);
              setError("");
            }}
            error={error}
          />
        )}

        {/* Listado CitaCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {citas.map((cita) => (
            <CitaCard key={cita.id} appointment={cita} />
          ))}
        </div>

        {citas.length === 0 && !error && (
          <div className="text-center py-10 text-gray-500">
            No hay citas programadas
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500">
            {error}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CitasPaciente;