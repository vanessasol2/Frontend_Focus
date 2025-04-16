import { User, Search } from "lucide-react";
import { useState } from "react";

const ListaPacientes = ({ pacientes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Pacientes</h2>

      {/* Barra de búsqueda */}
      <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-md mb-6">
        <Search className="w-5 h-5 text-[#5603ad] mr-2" />
        <input
          type="text"
          placeholder="Buscar Paciente"
          className="flex-1 outline-none bg-transparent text-sm text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-[#5603ad] text-white text-sm px-2 py-2 rounded-lg hover:bg-[#47038C] transition"
          onClick={() => setSearchTerm("")} 
        >
          Limpiar
        </button>
      </div>

      {/* Lista de pacientes con scroll */}
      {filteredPacientes.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron pacientes</p>
      ) : (
        <ul className="space-y-4 max-h-96 overflow-y-auto">
          {filteredPacientes.map((paciente, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{paciente}</p>
                  <p className="text-sm text-gray-500">Historia Clínica</p>
                </div>
              </div>
              <button className="text-[#5603ad] text-sm hover:underline">
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
