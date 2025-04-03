import { useState } from "react";
import { CalendarDays } from "lucide-react";
import MainLayout from "../../layout/MainLayout";
import Filter from "../../components/citaPsicologo/Filter";
import AppointmentModal from "../../components/citaPsicologo/CitaModal";
import AppointmentCard from "../../components/citaPsicologo/CitaCard";

const CitasPaciente = () => {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Sara Mateus",
      date: "October 15, 2023",
      time: "9:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Juan Pérez",
      date: "October 16, 2023",
      time: "10:00 AM",
      status: "Cancelled",
    },
    {
      id: 3,
      name: "Ana Gómez",
      date: "October 17, 2023",
      time: "11:00 AM",
      status: "Confirmed",
    },
  ]);

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex justify-end mb-2">
          <button
            className="bg-[#5603ad] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#47038C] transition-all duration-300 flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <CalendarDays className="w-5 h-5" /> Agendar una cita
          </button>
        </div>

        <div className="flex items-center gap-4">
          <h2 className="text-gray-800 font-semibold">Próximas Citas</h2>
          <Filter />
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
      </div>

      <AppointmentModal open={open} setOpen={setOpen} setAppointments={setAppointments} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </MainLayout>
  );
};

export default CitasPaciente;
