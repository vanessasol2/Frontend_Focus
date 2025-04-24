import React, { useState } from "react";
import {
  CalendarCheck2,
  SquareCheckBig,
  ClockAlert,
  BanIcon,
} from "lucide-react";
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
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

  const appointments = [
    {
      client: "Sara Mateus",
      status: "Completada",
      time: "1:00pm - 2:30pm",
      date: "23 Nov 2024",
    },
    {
      client: "Sara Mateus",
      status: "Pendiente",
      time: "3:00pm - 4:00pm",
      date: "24 Nov 2024",
    },
    {
      client: "Sara Mateus",
      status: "Cancelada",
      time: "10:00am - 11:30am",
      date: "25 Nov 2024",
    },
  ];

  return (
    <MainLayoutPsicologo>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-8">
        {/* Tarjetas resumen + Reuniones */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 auto-rows-max">
            {resumenData.map((item, index) => (
              <ResumenCard key={index} {...item} />
            ))}
          </div>

          {/*  ReunionesContenedor */}
          <ReunionesContenedor appointments={appointments} />
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
