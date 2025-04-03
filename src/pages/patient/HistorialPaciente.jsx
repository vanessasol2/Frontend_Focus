import FilterHisto from "../../components/historial/FilterHisto";
import Accordion from "../../components/historial/Accordion";
import MainLayout from "../../layout/MainLayout";
import { User, Calendar, Briefcase, Phone, HeartHandshake, Activity } from "lucide-react";
import { Pill, HeartPulse, Stethoscope } from "lucide-react";

const HistorialPaciente = () => {
  const patientData = {
    Edad: "50 años",
    Género: "Masculino",
    Hobbies: "Leer, Correr",
    Ocupación: "Ingeniero",
    Teléfono: "+123 456 7890",
    "Contacto de emergencia": "María López - +123 555 6789",
  };

  const fieldIcons = {
    Edad: <Calendar className="text-[#8350E8] w-5 h-5" />,
    Género: <User className="text-[#8350E8] w-5 h-5" />,
    Hobbies: <Activity className="text-[#8350E8] w-5 h-5" />,
    Ocupación: <Briefcase className="text-[#8350E8] w-5 h-5" />,
    Teléfono: <Phone className="text-[#8350E8] w-5 h-5" />,
    "Contacto de emergencia": (
      <HeartHandshake className="text-[#8350E8] w-5 h-5" />
    ),
  };

  return (
    <MainLayout>
      {/* Contenedor Principal */}
      <div className="flex gap-10 p-6 min-h-screen">
        {/* Columna Izquierda (Datos del Paciente) */}
        <div className="bg-white rounded-lg shadow-md w-1/3 p-6">
          {/* Información del Paciente */}
          <div className="text-center mb-6">
            <img
              src="https://img.freepik.com/foto-gratis/chico-caucasico-atractivo-seguro-beige-pullon-sonriendo-ampliamente-mientras-esta-pie-contra-gris_176420-44508.jpg"
              alt="Vanessa Solano"
              className="rounded-full w-24 h-24 mx-auto mb-4 object-cover "
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Vanessa Solano
            </h2>
            <p className="text-sm text-gray-500">Paciente</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 border-b pb-2">
              Datos personales
            </h3>
            <ul className="space-y-3 mt-2">
              {Object.entries(patientData).map(([label, value], index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-[#f3f0ff] p-3 rounded-lg shadow-sm"
                >
                  {fieldIcons[label]} {/* Ícono correspondiente */}
                  <div className="flex flex-col w-full">
                    <span className="text-sm font-medium text-[#8350E8]">
                      {label}:
                    </span>
                    <input
                      type="text"
                      className="w-full border-none bg-transparent text-gray-800 font-medium focus:outline-none"
                      value={value}
                      readOnly
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna Derecha (Historial y Antecedentes) */}
        <div className="bg-white rounded-lg shadow-md w-2/3 p-6">
          {/* Filtros */}
          <div className="mb-4">
            <FilterHisto />
          </div>

          {/* Lista de antecedentes */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 border-b pb-2">
              Antecedentes Médicos
            </h4>
            <p className="text-sm text-gray-600 mt-2">Terapia de pareja</p>
          </div>

          {/* Acordeón de información médica */}
          <div className="p-4 rounded-lg">
            <Accordion
              title={
                <div className="flex items-center gap-2 text-gray-700">
                  <Pill className="w-5 h-5 text-[#8350E8]" />
                  <span>Medicamentos Activos</span>
                </div>
              }
              answer="Listado de medicamentos en curso..."
            />

            <Accordion
              title={
                <div className="flex items-center gap-2 text-gray-700">
                  <HeartPulse className="w-5 h-5 text-[#D32F2F]" />
                  <span>Enfermedades</span>
                </div>
              }
              answer="Historial de enfermedades previas..."
            />

            <Accordion
              title={
                <div className="flex items-center gap-2 text-gray-700">
                  <Stethoscope className="w-5 h-5 text-[#388E3C]" />
                  <span>Síntomas</span>
                </div>
              }
              answer="Síntomas actuales reportados..."
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HistorialPaciente;
