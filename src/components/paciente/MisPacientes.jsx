import React, { useEffect, useState } from "react";
import { Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import FiltrosPacientes from "../../components/paciente/FiltrosPacientes";
import TarjetaPaciente from "../../components/paciente/TarjetaPaciente";
import { generarPacientesEjemplo } from "../../components/paciente/generarPacientes.js";

const MisPacientes = () => {
  const [busqueda, setBusqueda] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setPacientes(generarPacientesEjemplo(12));
      setCargando(false);
    }, 800);
    return () => clearTimeout(temporizador);
  }, []);

  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className=" mt-7">
      
      <FiltrosPacientes 
        valorBusqueda={busqueda} 
        onChangeBusqueda={(e) => setBusqueda(e.target.value)} 
      />
      
      {cargando ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : pacientesFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pacientesFiltrados.map((paciente) => (
            <TarjetaPaciente key={paciente.id} paciente={paciente} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-4">
            <User className="text-violet-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-700">No se encontraron pacientes</h3>
          <p className="text-gray-500 mt-1">
            {busqueda 
              ? `No hay resultados para "${busqueda}"`
              : "No hay pacientes registrados"}
          </p>
          <Link 
            to="/crear-paciente" 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary-color hover:bg-secundary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            <Plus size={16} className="mr-1" />
            Agregar nuevo paciente
          </Link>
        </div>
      )}
    </div>
  );
};

export default MisPacientes;
