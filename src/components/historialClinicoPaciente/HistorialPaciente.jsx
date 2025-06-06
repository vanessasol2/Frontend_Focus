import React from 'react';
import { useParams } from 'react-router-dom'; 
import PatientInfo from './PacienteInfo';
import NotesCard from './NotesCard';
import AppointmentsTable from './AppointmentsTable';
import TerapiaCards from './TerapiaCards';

export default function HistorialClinicoPaciente() {
  const { id } = useParams(); 

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-3">
          <PatientInfo id={id} />
        </div>
        
        <div className="lg:col-span-3 space-y-6 mt-6 ">
          <TerapiaCards pacienteId={id} />
        </div>
      </div>
    </div>
  );
}