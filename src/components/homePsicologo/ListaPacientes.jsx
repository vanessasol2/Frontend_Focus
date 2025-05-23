import { User, Search } from "lucide-react";
import { useState, useEffect } from "react";

const ListaPacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  // Filtrar pacientes 
  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //if (cargando) return <p className="text-center text-primary-color">Cargando pacientes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Pacientes</h2>

      {/* Barra de búsqueda */}
      <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-md mb-6">
        <Search className="w-5 h-5 text-primary-color mr-2" />
        <input
          type="text"
          placeholder="Buscar Paciente"
          className="flex-1 outline-none bg-transparent text-sm text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-primary-color text-white text-sm px-2 py-2 rounded-lg hover:bg-secundary-color transition"
          onClick={() => setSearchTerm("")}
        >
          Limpiar
        </button>
      </div>

      {/* Lista de pacientes */}
      {pacientesFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron pacientes</p>
      ) : (
        <ul className="space-y-4 max-h-96 overflow-y-auto">
          {pacientesFiltrados.map((paciente) => (
            <li
              key={paciente.id} 
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{paciente.nombre}</p>
                  <p className="text-sm text-gray-500">
                    {paciente.historiaClinica || "Sin historia clínica"}
                  </p>
                </div>
              </div>
              <button className="text-primary-color text-sm hover:underline">
                Ver detalles
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaPacientes;