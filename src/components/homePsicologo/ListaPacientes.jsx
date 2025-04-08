import { User } from "lucide-react";

const ListaPacientes = ({ pacientes }) => {
  return (
    <div className="p-3 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Pacientes</h2>

      <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-inner mb-4">
        <User className="w-5 h-5 text-violet-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar Paciente"
          className="flex-1 outline-none bg-transparent text-sm"
        />
        <button className="bg-[#5603ad] text-white text-sm px-3 py-1 rounded-lg hover:bg-[#47038C]">
          Buscar
        </button>
      </div>

      <ul className="space-y-3">
        {pacientes.map((paciente, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{paciente}</p>
                <p className="text-sm text-gray-500">Historia Clínica</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPacientes;
