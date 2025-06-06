import React, { useState, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { 
  format, 
  parse, 
  startOfWeek, 
  getDay, 
  addHours,
  isBefore,
  isSameDay,
  isWithinInterval,
  addDays
} from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from 'prop-types';
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import ModalCitaPsicologo from "../../components/citaPsicologo/ModalCitaPsicologo";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/citaPsicologo/CalendarioSelector.css";

// Configuración del localizador
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: es }),
  getDay,
  locales: { es },
});

// Constantes para colores y estilos
const COLOR_CITA_PSICOLOGO = '#5603ad';
const COLOR_CITA_PACIENTE = '#a847ba';
const DURACION_CITA_DEFAULT = 60; // minutos

// Datos mockeados de citas
const citasMock = [
  {
    id: 1,
    titulo: "Consulta Juan Pérez",
    start: addHours(new Date(), 2).toISOString(),
    end: addHours(new Date(), 3).toISOString(),
    notas: "Primera consulta, traer historial médico",
    agendadaPorPaciente: true,
    paciente: { nombre: "Juan Pérez" }
  },
  {
    id: 2,
    titulo: "Sesión María Gómez",
    start: addDays(addHours(new Date(), 24), 1).toISOString(),
    end: addDays(addHours(new Date(), 25), 1).toISOString(),
    notas: "Seguimiento mensual",
    agendadaPorPaciente: false,
    paciente: { nombre: "María Gómez" }
  },
  {
    id: 3,
    titulo: "Evaluación Carlos Ruiz",
    start: addDays(addHours(new Date(), 48), 2).toISOString(),
    end: addDays(addHours(new Date(), 49), 2).toISOString(),
    notas: "Evaluación final",
    agendadaPorPaciente: true,
    paciente: { nombre: "Carlos Ruiz" }
  }
];

const CitasPsicologo = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventos, setEventos] = useState(() => {
    // Formatear las citas mockeadas al cargar
    return citasMock.map(cita => ({
      id: cita.id,
      title: `${format(new Date(cita.start), 'HH:mm')} - ${cita.paciente.nombre}`,
      start: new Date(cita.start),
      end: new Date(cita.end),
      paciente: cita.paciente,
      notas: cita.notas,
      agendadaPorPaciente: cita.agendadaPorPaciente,
      style: {
        backgroundColor: cita.agendadaPorPaciente ? COLOR_CITA_PACIENTE : COLOR_CITA_PSICOLOGO,
        color: 'white',
        borderRadius: '4px',
        border: 'none'
      }
    }));
  });
  
  const [formulario, setFormulario] = useState({
    titulo: "",
    fecha: "",
    hora: "",
    notas: "",
  });
  
  const [error, setError] = useState("");

  // Formateador de hora para reutilización
  const formatHora = (date) => format(date, 'HH:mm', { locale: es });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Verificación de conflictos de horario
  const tieneConflicto = useCallback(
    (inicio, fin) => {
      return eventos.some((evento) => {
        const eventoInicio = new Date(evento.start);
        const eventoFin = new Date(evento.end);
        
        return (
          isWithinInterval(inicio, { start: eventoInicio, end: eventoFin }) ||
          isWithinInterval(fin, { start: eventoInicio, end: eventoFin }) ||
          (isBefore(inicio, eventoInicio) && isBefore(eventoFin, fin))
        );
      });
    },
    [eventos]
  );

  // Validación del formulario
  const validarFormulario = useCallback(() => {
    const { titulo, fecha, hora } = formulario;

    if (!titulo || !fecha || !hora) {
      setError("Por favor completa todos los campos obligatorios");
      return false;
    }

    const inicio = new Date(`${fecha}T${hora}:00`);
    const fin = addHours(inicio, 1); // Citas de 1 hora por defecto

    if (tieneConflicto(inicio, fin)) {
      setError("Esta cita se cruza con otra ya agendada");
      return false;
    }

    if (isBefore(inicio, new Date())) {
      setError("No puedes agendar citas en fechas pasadas");
      return false;
    }

    return true;
  }, [formulario, tieneConflicto]);

  // Agregar nueva cita (mock)
  const agregarEvento = () => {
    if (!validarFormulario()) return;

    const inicio = new Date(`${formulario.fecha}T${formulario.hora}:00`);
    const fin = addHours(inicio, 1);
    const nuevoId = Math.max(...eventos.map(e => e.id), 0) + 1;

    const nuevaCita = {
      id: nuevoId,
      title: `${formatHora(inicio)} - ${formulario.titulo}`,
      start: inicio,
      end: fin,
      paciente: { nombre: formulario.titulo },
      notas: formulario.notas,
      agendadaPorPaciente: false,
      style: {
        backgroundColor: COLOR_CITA_PSICOLOGO,
        color: 'white',
        borderRadius: '4px',
        border: 'none'
      }
    };

    setEventos(prev => [...prev, nuevaCita]);
    setModalAbierto(false);
    setFormulario({
      titulo: "",
      fecha: "",
      hora: "",
      notas: "",
    });
  };

  // Propiedades para los días del calendario
  const dayPropGetter = useCallback((date) => {
    const hoy = new Date();
    const esPasado = isBefore(date, hoy) && !isSameDay(date, hoy);

    return {
      className: esPasado ? "dia-pasado" : isSameDay(date, hoy) ? "dia-actual" : "",
    };
  }, []);

  // Componente personalizado para eventos
  const EventoCalendario = ({ event }) => {
    if (!event) return null;

    return (
      <div className="evento-calendario" style={event.style}>
        <div className="evento-contenido">
          <strong>{event.paciente.nombre}</strong>
          <small>{formatHora(event.start)} - {formatHora(event.end)}</small>
          {event.notas && <p className="notas-evento">{event.notas}</p>}
          <span className="agendado-por">
            {event.agendadaPorPaciente ? "Agendado por paciente" : "Agendado por psicólogo"}
          </span>
        </div>
      </div>
    );
  };

  EventoCalendario.propTypes = {
    event: PropTypes.object
  };

  // Generar CSV para exportación
  const exportarCitas = () => {
    const headers = ["Paciente", "Fecha Inicio", "Fecha Fin", "Notas", "Agendado por"];
    const rows = eventos.map((e) => [
      `"${e.paciente.nombre}"`,
      `"${format(e.start, "yyyy-MM-dd HH:mm")}"`,
      `"${format(e.end, "yyyy-MM-dd HH:mm")}"`,
      `"${e.notas || ""}"`,
      `"${e.agendadaPorPaciente ? 'Paciente' : 'Psicólogo'}"`
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `citas-psicologo-${format(new Date(), "yyyyMMdd")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mensajes del calendario
  const messages = useMemo(() => ({
    next: <ChevronRight size={20} />,
    previous: <ChevronLeft size={20} />,
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay citas programadas",
  }), []);

  return (
    <MainLayoutPsicologo>
      <div className="p-4 mt-7">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gestión de Citas</h1>
        
        {/* Indicadores y controles */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-sm bg-[#5603ad] mr-2"></div>
              <span className="text-sm">Citas propias</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-sm bg-[#a847ba] mr-2"></div>
              <span className="text-sm">Citas de pacientes</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={exportarCitas}
              className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={eventos.length === 0}
            >
              Exportar a CSV
            </button>
            
            <button
              className="bg-primary-color text-white py-2 px-4 rounded-lg hover:bg-secundary-color transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() => setModalAbierto(true)}
            >
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
              Agendar nueva cita
            </button>
          </div>
        </div>

        {/* Modal para nueva cita */}
        {modalAbierto && (
          <ModalCitaPsicologo
            formulario={formulario}
            manejarCambio={manejarCambio}
            agregarEvento={agregarEvento}
            cerrarModal={() => {
              setModalAbierto(false);
              setError("");
              setFormulario({
                titulo: "",
                fecha: "",
                hora: "",
                notas: "",
              });
            }}
            error={error}
          />
        )}

        {/* Calendario */}
        <div className="calendario-contenedor bg-white rounded-lg shadow-md p-4">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month", "week", "day"]}
            defaultDate={new Date()}
            style={{ height: 600 }}
            messages={messages}
            dayPropGetter={dayPropGetter}
            components={{
              event: EventoCalendario,
            }}
            eventPropGetter={(event) => ({
              style: event.style
            })}
            culture="es"
          />
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CitasPsicologo;