import { CalendarDays, X, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";
import { useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/citaPsicologo/CalendarioCita.css";

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
    notas: ""
  });
  const [error, setError] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const tieneConflicto = useCallback((inicio, fin) => {
    return eventos.some(evento => {
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
  }, [eventos]);

  const agregarEvento = () => {
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

    const nuevoEvento = {
      id: Date.now(),
      title: `${inicio.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })} - ${titulo}`,
      start: inicio,
      end: fin,
      paciente: titulo,
      notas: formulario.notas
    };

    setEventos([...eventos, nuevoEvento]);
    setModalAbierto(false);
    setFormulario({
      titulo: "",
      fecha: "",
      hora: "",
      notas: ""
    });
  };

  const dayPropGetter = (date) => {
    const hoy = new Date();
    const esPasado = date < hoy && date.toDateString() !== hoy.toDateString();
    const esHoy = date.toDateString() === hoy.toDateString();

    return {
      className: esPasado 
        ? 'dia-pasado' 
        : esHoy 
          ? 'dia-actual' 
          : ''
    };
  };

  const EventoCalendario = ({ event }) => {  
    if (!event) return null;  
    
    return (
      <div className="evento-calendario">
        <div className="evento-contenido">
          <strong>{event.title.split(" - ")[1]}</strong>
          <small>{event.title.split(" - ")[0]}</small>
          {event.notas && <p className="notas-evento">{event.notas}</p>}
        </div>
      </div>
    );
  };

  return (
    <MainLayoutPsicologo>
      <div className="p-4 mt-8">
        <div className="flex justify-end mb-2">
          <button
            className="bg-[#5603ad] text-white py-2 px-6 rounded-lg hover:bg-[#47038C] transition-all duration-300 flex items-center gap-2"
            onClick={() => setModalAbierto(true)}
          >
            <CalendarDays className="w-5 h-5" /> 
            Agendar nueva cita
          </button>
        </div>

        {modalAbierto && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2 className="modal-title">Agendar nueva cita</h2>
                <button 
                  onClick={() => {
                    setModalAbierto(false);
                    setError("");
                  }}
                  className="modal-close-button"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-content">
                {error && <div className="modal-error">{error}</div>}

                <div className="form-group">
                  <label className="form-label">
                    Paciente <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formulario.titulo}
                    onChange={manejarCambio}
                    className="form-input"
                    placeholder="Nombre del paciente"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Fecha <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      value={formulario.fecha}
                      onChange={manejarCambio}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Hora <span className="required">*</span>
                    </label>
                    <input
                      type="time"
                      name="hora"
                      value={formulario.hora}
                      onChange={manejarCambio}
                      className="form-input"
                      min="09:00"
                      max="18:00"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Notas adicionales</label>
                  <textarea
                    name="notas"
                    value={formulario.notas}
                    onChange={manejarCambio}
                    className="form-textarea"
                    placeholder="Observaciones o detalles importantes"
                    rows="3"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false);
                    setError("");
                  }}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={agregarEvento}
                  className="bg-[#5603ad] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#47038C] transition"
                >
                  Guardar cita
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="calendario-contenedor">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month", "week", "day"]}
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
              event: EventoCalendario
            }}
          />
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CitasPsicologo;