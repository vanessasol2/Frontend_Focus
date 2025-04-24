import { useEffect, useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import ModalCitaPsicologo from "../../components/citaPsicologo/ModalCitaPsicologo";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/citaPsicologo/CalendarioSelector.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { es },
});

const CitasPsicologo = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventos, setEventos] = useState([]);
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
        const response = await fetch(`http://localhost:8080/api/citas/psicologo/${pacienteId}`);
        if (!response.ok) throw new Error('Error al cargar citas');
        
        const citas = await response.json();
        
        const eventosFormateados = citas.map(cita => ({
          id: cita.id,
          title: `${format(new Date(cita.start), 'HH:mm')} - ${cita.paciente?.nombre || cita.titulo}`,
          start: new Date(cita.start),
          end: new Date(cita.end),
          paciente: cita.paciente || { nombre: cita.titulo },
          notas: cita.notas,
          agendadaPorPaciente: cita.agendadaPorPaciente,
          style: {
            backgroundColor: cita.agendadaPorPaciente ? '#a847ba' : '#5603ad',
            color: 'white',
            borderRadius: '4px',
            border: 'none'
          }
        }));
        
        setEventos(eventosFormateados);
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

  const tieneConflicto = useCallback(
    (inicio, fin) => {
      return eventos.some((evento) => {
        const eventoInicio = new Date(evento.start);
        const eventoFin = new Date(evento.end);
        const nuevoInicio = new Date(inicio);
        const nuevoFin = new Date(fin);

        return (
          (nuevoInicio >= eventoInicio && nuevoInicio < eventoFin) ||
          (nuevoFin > eventoInicio && nuevoFin <= eventoFin) ||
          (nuevoInicio <= eventoInicio && nuevoFin >= eventoFin)
        );
      });
    },
    [eventos]
  );

  const agregarEvento = async () => {
    const { titulo, fecha, hora } = formulario;

    if (!titulo || !fecha || !hora) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    const inicio = new Date(`${fecha}T${hora}:00`);
    const fin = new Date(inicio.getTime() + 60 * 60 * 1000);

    if (tieneConflicto(inicio, fin)) {
      setError("Esta cita se cruza con otra ya agendada");
      return;
    }

    if (inicio < new Date()) {
      setError("No puedes agendar citas en fechas pasadas");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/', {
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

      if (!response.ok) throw new Error('Error al guardar');

      
      const nuevaCita = await response.json();
      setEventos(prev => [...prev, {
        id: nuevaCita.id,
        title: `${format(inicio, 'HH:mm')} - ${titulo}`,
        start: inicio,
        end: fin,
        paciente: { nombre: titulo },
        notas: formulario.notas,
        agendadaPorPaciente: false,
        style: {
          backgroundColor: '#5603ad',
          color: 'white'
        }
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

  const dayPropGetter = (date) => {
    const hoy = new Date();
    const esPasado = date < hoy && date.toDateString() !== hoy.toDateString();
    const esHoy = date.toDateString() === hoy.toDateString();

    return {
      className: esPasado ? "dia-pasado" : esHoy ? "dia-actual" : "",
    };
  };

  const EventoCalendario = ({ event }) => {
    if (!event) return null;

    return (
      <div className="evento-calendario" style={event.style}>
        <div className="evento-contenido">
          <strong>{event.paciente.nombre}</strong>
          <small>{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</small>
          {event.notas && <p className="notas-evento">{event.notas}</p>}
          <span className="agendado-por">
            {event.agendadaPorPaciente ? "Agendado por paciente" : "Agendado por psicólogo"}
          </span>
        </div>
      </div>
    );
  };

  const exportarCitas = () => {
    const csvContent = [
      "Paciente,Fecha Inicio,Fecha Fin,Notas,Agendado por",
      ...eventos.map(
        (e) =>
          `"${e.paciente.nombre}","${format(e.start, "yyyy-MM-dd HH:mm")}","${format(
            e.end,
            "yyyy-MM-dd HH:mm"
          )}","${e.notas || ""}","${e.agendadaPorPaciente ? 'Paciente' : 'Psicólogo'}"`
      ),
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

  return (
    <MainLayoutPsicologo>
      <div className="p-4 mt-7">
        <h1 className="text-xl font-semibold text-gray-800">Gestión de Citas</h1>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#5603ad] mr-1"></div>
              <span className="text-sm">Citas propias</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#a847ba] mr-1"></div>
              <span className="text-sm">Citas de pacientes</span>
            </div>
          </div>
          <div className="flex gap-x-4">
            <button
              onClick={exportarCitas}
              className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition-all duration-300 flex items-center gap-2"
            >
              Exportar a CSV
            </button>
            <button
              className="bg-primary-color text-white py-2 px-6 rounded-lg hover:bg-secundary-color transition-all duration-300 flex items-center gap-2"
              onClick={() => setModalAbierto(true)}
            >
              <CalendarDays className="w-5 h-5" />
              Agendar nueva cita
            </button>
          </div>
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

        <div className="calendario-contenedor">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month"]}
            defaultDate={new Date()}
            style={{ height: 600 }}
            messages={{
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
            }}
            dayPropGetter={dayPropGetter}
            components={{
              event: EventoCalendario,
            }}
            eventPropGetter={(event) => ({
              style: event.style
            })}
          />
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CitasPsicologo;