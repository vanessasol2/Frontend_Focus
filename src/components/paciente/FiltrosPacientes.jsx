import React, { useEffect, useRef } from "react";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const FiltrosPacientes = ({ 
  valorBusqueda, 
  onChangeBusqueda, 
  buscando = false 
}) => {
  const debouncedOnChange = useRef(
    debounce((value) => {
      onChangeBusqueda({ target: { value } });
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (e) => {
    const value = e.target.value;
    debouncedOnChange(value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex flex-wrap gap-2">
        <Link to="/pacientes">
          <button 
            className="bg-violet-100 text-primary-color text-sm px-4 py-1 rounded-full hover:bg-violet-200 transition-colors"
            onClick={() => onChangeBusqueda({ target: { value: "" } })}
          >
            Todos
          </button>
        </Link>
        <Link to="/crear-paciente">
          <button className="rounded-full border border-violet-200 px-4 py-1 text-sm text-[#5603ad] hover:bg-violet-50 flex items-center gap-1">
            <Plus size={14} />
            Nuevo Paciente
          </button>
        </Link>
      </div>
      
      <div className="w-full md:w-96 relative">
        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 w-full focus-within:border-primary-color focus-within:ring-1 focus-within:ring-violet-200 transition-all">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            className="flex-1 outline-none text-sm bg-transparent placeholder-gray-400"
            placeholder="Buscar por nombre o correo..."
            defaultValue={valorBusqueda}
            onChange={handleChange}
            aria-label="Buscar pacientes"
          />
          {buscando && (
            <span className="text-sm text-gray-400 ml-2">Buscando...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltrosPacientes;