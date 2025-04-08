import { CalendarClock, User } from "lucide-react";

const ReunionesContenedor = ({ reuniones = [] }) => {
  return (
    <div className="p-5 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <CalendarClock className="text-violet-600 w-5 h-5" />
        Próximas Reuniones
      </h2>

      {reuniones.length === 0 ? (
        <p className="text-sm text-gray-500">No hay reuniones programadas.</p>
      ) : (
        <ul className="space-y-4">
          {reuniones.map((reunion, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-inner"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{reunion.paciente}</p>
                  <p className="text-sm text-gray-500">{reunion.hora} - {reunion.fecha}</p>
                </div>
              </div>
              <span className="text-sm px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                {reunion.estado}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReunionesContenedor;
