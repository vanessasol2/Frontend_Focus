import { Dialog } from "@headlessui/react";
import { CalendarDays, XCircle } from "lucide-react";

const CitaModal = ({ open, setOpen, agendarCita }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-gray-400/75" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-300"
            onClick={() => setOpen(false)}
          >
            <XCircle className="w-6 h-6" />
          </button>
          <div className="sm:flex sm:items-center gap-3 mb-4">
            <div className="flex items-center justify-center rounded-full bg-[#cab0e5] p-2">
              <CalendarDays className="h-6 w-6 text-[#5603ad]" />
            </div>
            <h2 className="text-xl font-semibold text-[#5603ad]">Agendar Cita</h2>
          </div>
          <p className="text-gray-600 mt-2">Selecciona la fecha y hora para tu cita.</p>
          <div className="mt-4">
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8350E8]" />
            <input type="time" className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8350E8]" />
          </div>
          <div className="flex justify-between mt-5">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-[#5603ad] text-white rounded-lg hover:bg-[#47038C] transition-all duration-300"
              onClick={agendarCita}
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CitaModal;