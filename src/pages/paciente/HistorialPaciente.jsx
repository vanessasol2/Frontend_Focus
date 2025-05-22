import React from "react";
import FilterHisto from "../../components/historial/FilterHisto";
import Accordion from "../../components/historial/Accordion";
import MainLayout from "../../layout/paciente/MainLayout";
import { 
  User, 
  Calendar, 
  Briefcase, 
  Phone, 
  HeartHandshake, 
  Activity,
  Pill,
  HeartPulse,
  Stethoscope
} from "lucide-react";

const HistorialPaciente = () => {
 
  const patientInfo = {
    basicInfo: {
      name: "Vanessa Solano",
      role: "Paciente",
      image: "https://img.freepik.com/foto-gratis/chico-caucasico-atractivo-seguro-beige-pullon-sonriendo-ampliamente-mientras-esta-pie-contra-gris_176420-44508.jpg"
    },
    personalData: {
      "Edad": "50 años",
      "Género": "Masculino",
      "Hobbies": "Leer, Correr",
      "Ocupación": "Ingeniero",
      "Teléfono": "+123 456 7890",
      "Contacto de emergencia": "María López - +123 555 6789"
    },
    medicalHistory: {
      background: "Terapia de pareja",
      sections: [
        {
          title: "Medicamentos Activos",
          icon: <Pill className="w-5 h-5 text-purple-600" />,
          content: "Listado de medicamentos en curso..."
        },
        {
          title: "Enfermedades",
          icon: <HeartPulse className="w-5 h-5 text-red-600" />,
          content: "Historial de enfermedades previas..."
        },
        {
          title: "Síntomas",
          icon: <Stethoscope className="w-5 h-5 text-green-600" />,
          content: "Síntomas actuales reportados..."
        }
      ]
    }
  };

 
  const fieldIcons = {
    "Edad": <Calendar className="w-5 h-5 text-purple-600" />,
    "Género": <User className="w-5 h-5 text-purple-600" />,
    "Hobbies": <Activity className="w-5 h-5 text-purple-600" />,
    "Ocupación": <Briefcase className="w-5 h-5 text-purple-600" />,
    "Teléfono": <Phone className="w-5 h-5 text-purple-600" />,
    "Contacto de emergencia": <HeartHandshake className="w-5 h-5 text-purple-600" />
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/*Datos del Paciente */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:w-1/3 p-6">
            <div className="text-center mb-6">
              <img
                src={patientInfo.basicInfo.image}
                alt={patientInfo.basicInfo.name}
                className="rounded-full w-24 h-24 mx-auto mb-4 object-cover border-2 border-purple-100"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {patientInfo.basicInfo.name}
              </h2>
              <p className="text-sm text-gray-500">{patientInfo.basicInfo.role}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
                Datos personales
              </h3>
              <ul className="space-y-3">
                {Object.entries(patientInfo.personalData).map(([label, value]) => (
                  <li key={label} className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg">
                    <span aria-hidden="true">
                      {fieldIcons[label]}
                    </span>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-purple-700 mb-1">
                        {label}
                      </label>
                      <div className="text-sm font-medium text-gray-800">
                        {value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*  Historial Médico */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:w-2/3 p-6">
            <div className="mb-6">
              <FilterHisto />
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Antecedentes Médicos
              </h4>
              <p className="text-gray-600">{patientInfo.medicalHistory.background}</p>
            </div>

            <div className="space-y-4">
              {patientInfo.medicalHistory.sections.map((section, index) => (
                <Accordion
                  key={index}
                  title={
                    <div className="flex items-center gap-2">
                      {section.icon}
                      <span className="font-medium text-gray-800">{section.title}</span>
                    </div>
                  }
                  answer={section.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HistorialPaciente;