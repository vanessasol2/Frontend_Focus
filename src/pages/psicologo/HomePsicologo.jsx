import React, { useState } from "react";
import {
  CalendarCheck2,
  SquareCheckBig,
  ClockAlert,
  BanIcon,
} from "lucide-react";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";
import ResumenCard from "../../components/homePsicologo/ResumenCard";
import CalendarioSection from "../../components/homePsicologo/CalendarioCita";
import ListaPacientes from "../../components/homePsicologo/ListaPacientes";
import ReunionesContenedor from "../../components/homePsicologo/ReunionesContenedor";

const HomePsicologo = () => {
  const [date, setDate] = useState(new Date());

  const resumenData = [
    {
      title: "Total Citas",
      icon: <CalendarCheck2 className="text-violet-700" />,
      circleColor: "bg-violet-200",
      cardColor: "bg-violet-50",
      value: 10,
      link: "/citas-psicologo",
    },
    {
      title: "Citas Completadas",
      icon: <SquareCheckBig className="text-green-700" />,
      circleColor: "bg-green-200",
      cardColor: "bg-green-50",
      value: 4,
      link: "/citas-psicologo",
    },
    {
      title: "Citas Pendientes",
      icon: <ClockAlert className="text-yellow-700" />,
      circleColor: "bg-yellow-200",
      cardColor: "bg-yellow-50",
      value: 5,
      link: "/citas-psicologo",
    },
    {
      title: "Citas Canceladas",
      icon: <BanIcon className="text-red-700" />,
      circleColor: "bg-red-200",
      cardColor: "bg-red-50",
      value: 3,
      link: "/citas-psicologo",
    },
  ];

  const pacientes = [
    "Sara Mateus",
    "Tatiana Pulido",
    "Mateo Jaz",
    "Alex Mutt",
    "Andres Lopez",
    "Sofía Yazon",
    "Ximena Ron",
    "Vanessa Sol",
  ];

  const reuniones = [
    {
      paciente: "Tatiana Pulido",
      fecha: "08/04/2025",
      hora: "10:00 AM",
      estado: "Confirmada",
    },
    {
      paciente: "Mateo Jaz",
      fecha: "08/04/2025",
      hora: "11:30 AM",
      estado: "Pendiente",
    },
    {
      paciente: "Sofía Yazon",
      fecha: "08/04/2025",
      hora: "1:00 PM",
      estado: "Confirmada",
    },
  ];

  return (
    <MainLayoutPsicologo>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-8">
    {/* Tarjetas resumen + Reuniones */}
    <div className="lg:col-span-2 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
        {resumenData.map((item, index) => (
          <ResumenCard key={index} {...item} />
        ))}
      </div>

      {/*  ReunionesContenedor */}
      <ReunionesContenedor reuniones={reuniones} />
    </div>

    {/* Calendario + Pacientes */}
    <div className="flex flex-col gap-6">
      <CalendarioSection date={date} setDate={setDate} />
      <ListaPacientes pacientes={pacientes} />
    </div>
  </div>
</MainLayoutPsicologo>

  );
};

export default HomePsicologo;
