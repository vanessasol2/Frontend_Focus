import React from 'react';
import Calendar from "react-calendar";
import "../../components/homePsicologo/Calendario.css"

const CalendarioCita = ({ date, setDate }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Calendario</h2>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} className="w-full" />
      </div>
    </div>
  );
};

export default CalendarioCita;
