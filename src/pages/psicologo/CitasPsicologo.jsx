import { CalendarDays } from "lucide-react";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";

export default function CitasPsicologo() {
  

  return (
    <MainLayoutPsicologo>
      <div className="w-full p-6 bg-[#f9f9fb] rounded-xl">
        {/* Botón agendar */}
        <div className="flex justify-end mb-2">
          <button
            className="bg-[#5603ad] text-white py-2 px-6 rounded-lg hover:bg-[#47038C] transition-all duration-300 flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <CalendarDays className="w-5 h-5" /> Agendar una cita
          </button>
        </div>

       
      </div>
    </MainLayoutPsicologo>
  );
}
