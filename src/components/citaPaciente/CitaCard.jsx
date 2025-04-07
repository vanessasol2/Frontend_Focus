import { CalendarDays, Clock3, CheckCircle, XCircle } from "lucide-react";

const CitaCard = ({ appointment }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col space-y-4 hover:shadow-lg transition-all duration-300 border border-gray-200 ">
      <h3 className="text-gray-800 text-lg font-semibold">Psicólogo:</h3>
      <h2 className="text-gray-600 text-lg">{appointment.name}</h2>
      <div className="flex justify-between items-center text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-[#5603ad]" />
          <h2 className="text-sm">{appointment.date}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-[#5603ad]" />
          <p className="text-sm">{appointment.time}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {appointment.status === "Confirmed" ? (
          <div className="flex items-center text-green-600 font-medium">
            <CheckCircle className="h-5 w-5 mr-1" /> Confirmada
          </div>
        ) : (
          <div className="flex items-center text-red-600 font-medium">
            <XCircle className="h-5 w-5 mr-1" /> Cancelada
          </div>
        )}
      </div>
    </div>
  );
};

export default CitaCard;
