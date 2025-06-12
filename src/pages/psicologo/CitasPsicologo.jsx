import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isBefore,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from 'prop-types';
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/citaPsicologo/CalendarioSelector.css";
import { traerSesionesCard } from "../../service/terapiaService";


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: es }),
  getDay,
  locales: { es },
});


const COLOR_CITA_PSICOLOGO = '#5603ad';
const COLOR_CITA_PACIENTE = '#a847ba';

const CitasPsicologo = () => {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);


  const formatHora = (date) => format(date, 'HH:mm', { locale: es });

  const formatearEventos = useCallback((sesiones) => {
    return sesiones.map(sesion => {
      if (!sesion.fechaSesion || !sesion.horaInicio || !sesion.horaFin) {
        console.warn('Sesión con datos incompletos:', sesion);
        return null;
      }

      try {
        const [year, month, day] = sesion.fechaSesion;
        const [hoursInicio, minutesInicio] = sesion.horaInicio;
        const [hoursFin, minutesFin] = sesion.horaFin;

        const fechaInicio = new Date(year, month - 1, day, hoursInicio, minutesInicio);
        const fechaFin = new Date(year, month - 1, day, hoursFin, minutesFin);

        if (isNaN(fechaInicio.getTime())) throw new Error('Fecha inicio inválida');
        if (isNaN(fechaFin.getTime())) throw new Error('Fecha fin inválida');

        return {
          id: sesion.id,
          title: `${formatHora(fechaInicio)} - ${sesion.nombrePaciente}`,
          start: fechaInicio,
          end: fechaFin,
          paciente: { nombre: sesion.nombrePaciente },
          style: {
            backgroundColor: sesion.agendadaPorPaciente ? COLOR_CITA_PACIENTE : COLOR_CITA_PSICOLOGO,
            color: 'white',
            borderRadius: '4px',
            border: 'none'
          }
        };
      } catch (error) {
        console.error('Error al formatear sesión:', error, sesion);
        return null;
      }
    }).filter(Boolean);
  }, []);


  useEffect(() => {
    const cargarSesiones = async () => {
      try {
        const data = await traerSesionesCard();
        console.log("Sesiones crudas:", data);
        setEventos(formatearEventos(data));
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar sesiones:", error);
        setErrorCarga("No se pudieron cargar las sesiones. Intente nuevamente.");
        setCargando(false);
      }
    };

    cargarSesiones();
  }, [formatearEventos]);

  const dayPropGetter = useCallback((date) => {
    const hoy = new Date();
    const esPasado = isBefore(date, hoy) && !isSameDay(date, hoy);

    return {
      className: esPasado ? "dia-pasado" : isSameDay(date, hoy) ? "dia-actual" : "",
    };
  }, []);


  const EventoCalendario = ({ event }) => {
    if (!event) return null;

    return (
      <div className="evento-calendario rounded-md shadow-sm p-1" style={event.style}>
        <div className="evento-contenido flex flex-col gap-1">
          <strong className="text-sm font-semibold truncate">{event.paciente.nombre}</strong>
          <small className="text-xs text-gray-100">{formatHora(event.start)} - {formatHora(event.end)}</small>
        </div>
      </div>

    );
  };

  EventoCalendario.propTypes = {
    event: PropTypes.object
  };


  const exportarCitas = () => {
    const headers = ["Paciente", "Fecha Inicio", "Fecha Fin"];
    const rows = eventos.map((e) => [
      `"${e.paciente.nombre}"`,
      `"${format(e.start, "yyyy-MM-dd HH:mm")}"`,
      `"${format(e.end, "yyyy-MM-dd HH:mm")}"`,
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


  const messages = useMemo(() => ({
  next: "Siguiente",
  previous: "Anterior",
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Calendario de Citas </h1>

        {cargando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
          </div>
        ) : errorCarga ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorCarga}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
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

              <button
                onClick={exportarCitas}
                className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={eventos.length === 0}
              >
                Exportar a CSV
              </button>
            </div>

            <div className="calendario-contenedor bg-white rounded-lg shadow-md p-4">
              <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                views={["month"]}
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
          </>
        )}
      </div>
    </MainLayoutPsicologo>
  );
};


const CustomToolbar = ({ date, onNavigate }) => {
  const label = format(date, "MMMM yyyy", { locale: es });

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('PREV')} className="p-2 rounded hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => onNavigate('NEXT')} className="p-2 rounded hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
        <button onClick={() => onNavigate('TODAY')} className="ml-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Hoy
        </button>
      </div>
      <div className="text-lg font-semibold capitalize">{label}</div>
    </div>
  );
};
 
export default CitasPsicologo;