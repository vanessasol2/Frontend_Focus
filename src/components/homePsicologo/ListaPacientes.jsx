import React from 'react';
import { User, Search, X, Loader2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';

const ListaPacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const buscarPacientes = async () => {
      if (searchTerm.trim() === "") {
        setPacientes([]);
        setHasSearched(false);
        return;
      }

      try {
        setCargando(true);
        setError(null);

        const response = await axios.get(`http://localhost:8081/paciente/buscarPaciente`, {
          params: {
            busqueda: searchTerm
          }
        });

        setPacientes(response.data);
        setHasSearched(true);
      } catch (err) {
        setError("Error al buscar pacientes. Por favor, intente nuevamente.");
        console.error("Error fetching pacientes:", err);
      } finally {
        setCargando(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      buscarPacientes();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setPacientes([]);
    setHasSearched(false);
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Buscar Pacientes</h2>
        {searchTerm && (
          <span className="text-xs sm:text-sm text-gray-500 self-end sm:self-auto">
            {pacientes.length} resultado{pacientes.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Barra de búsqueda responsive */}
      <div className="relative flex items-center bg-white rounded-md px-3 py-2 sm:px-4 sm:py-2 shadow-xs border border-gray-200 focus-within:border-primary-color focus-within:ring-1 focus-within:ring-primary-color/10 mb-4 sm:mb-6 transition-all duration-150">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Buscar pacientes..."
          className="flex-1 outline-none bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="ml-1 p-0.5 rounded hover:bg-gray-100 transition"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Estado de la búsqueda - responsive */}
      {error ? (
        <div className="flex flex-col items-center justify-center p-6 sm:py-12 bg-red-50 rounded-lg">
          <Info className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mb-2 sm:mb-3" />
          <p className="text-center text-sm sm:text-base text-red-500 font-medium">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 hover:underline"
          >
            Reintentar
          </button>
        </div>
      ) : cargando ? (
        <div className="flex flex-col items-center justify-center p-6 sm:py-12">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-color animate-spin mb-2 sm:mb-3" />
          <p className="text-center text-sm sm:text-base text-primary-color">Buscando pacientes...</p>
        </div>
      ) : hasSearched && pacientes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 sm:py-12 bg-gray-50 rounded-lg">
          <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2 sm:mb-3" />
          <p className="text-center text-sm sm:text-base text-gray-500 font-medium">No encontramos pacientes</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Intenta con otros términos de búsqueda</p>
        </div>
      ) : pacientes.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          <ul className="space-y-2 sm:space-y-3">
            {pacientes.map((paciente) => (
              <li
                key={paciente.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-xs border border-gray-100 hover:border-primary-color/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 mb-2 sm:mb-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-color/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-color" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">{paciente.nombre}</p>
                    {paciente.email && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {paciente.email} 
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {pacientes.length > 5 && (
            <div className="pt-1 sm:pt-2 text-center text-xs sm:text-sm text-gray-500">
              Mostrando {pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 sm:py-12 bg-gray-50 rounded-lg">
          <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2 sm:mb-3" />
          <p className="text-center text-sm sm:text-base text-gray-500 font-medium">Busca pacientes por nombre</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Escribe en el campo de búsqueda para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default ListaPacientes;