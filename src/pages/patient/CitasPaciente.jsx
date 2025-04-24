import { useState } from "react";
import { CalendarDays } from "lucide-react";
import MainLayout from "../../layout/paciente/MainLayout";
import Filter from "../../components/citaPaciente/Filter";
import ModalCitaPsicologo from "../../components/citaPaciente/ModalCitaPsicologo";
import AppointmentCard from "../../components/citaPaciente/CitaCard";

const CitasPaciente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    notas: ''
  });
  const [error, setError] = useState('');
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!formData.titulo || !formData.fecha || !formData.hora) {
      setError('Todos los campos obligatorios deben ser completados');
      return;
    }
    
    // Crear nueva cita
    const newAppointment = {
      id: appointments.length + 1,
      name: formData.titulo,
      date: new Date(formData.fecha).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: formData.hora,
      status: "Confirmed"
    };
    
    setAppointments([...appointments, newAppointment]);
    setIsModalOpen(false);
    setFormData({ titulo: '', fecha: '', hora: '', notas: '' });
    setError('');
  };

  return (
    <MainLayout>
      <div className="p-4 mt-8">
        <div className="flex justify-end mb-2">
          <button
            className="bg-primary-color text-white py-2 px-6 rounded-lg hover:bg-secundary-color transition-all duration-300 flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
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

      <ModalCitaPsicologo
        open={isModalOpen}
        setOpen={setIsModalOpen}
        formulario={formData}
        manejarCambio={handleChange}
        agregarEvento={handleSubmit}
        error={error}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </MainLayout>
  );
};

export default CitasPaciente;