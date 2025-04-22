import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const FiltroCrearPaciente = () => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
    <div className="flex flex-wrap gap-2">
      <Link to="/pacientes">
        <button className="bg-violet-100 text-[#5603ad] text-sm px-4 py-1 rounded-full hover:bg-violet-200 transition-colors">
          Todos
        </button>
      </Link>
      <Link to="/crear-paciente">
        <button className="rounded-full border border-violet-200 px-4 py-1 text-sm text-[#5603ad] hover:bg-violet-50 flex items-center gap-1">
          <Plus size={14} />
          Nuevo Paciente
        </button>
      </Link>
      <Link to="/historial-clinico">
        <button className="rounded-full border border-violet-200 px-4 py-1 text-sm text-[#5603ad] hover:bg-violet-50 flex items-center gap-1">
          <Plus size={14} />
          Historial clínico
        </button>
      </Link>
    </div>
  </div>
);

export default FiltroCrearPaciente;
