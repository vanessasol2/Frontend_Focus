import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [resumenData, setResumenData] = useState([]);

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

  useEffect(() => {
  const fetchResumenData = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/sesion/sesiones', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const backendData = response.data;
      if (!Array.isArray(backendData)) {
        console.error("Datos inesperados:", backendData);
        setResumenData([]); 
        return;
      }
      
      const getCantidadByEstado = (estado) => {
        const item = backendData.find(item => item.estado === estado);
        return item ? item.cantidad : 0;
      };

      const totalCitas = backendData.reduce((sum, item) => sum + item.cantidad, 0);

      const resumen = [
        {
          title: "Total Citas",
          icon: <CalendarCheck2 className="text-violet-700" />,
          circleColor: "bg-violet-200",
          cardColor: "bg-violet-50",
          value: totalCitas,
          link: "/citas-psicologo",
        },
        {
          title: "Citas Completadas",
          icon: <SquareCheckBig className="text-green-700" />,
          circleColor: "bg-green-200",
          cardColor: "bg-green-50",
          value: getCantidadByEstado("COMPLETADA"),
          link: "/citas-psicologo",
        },
        {
          title: "Citas Pendientes",
          icon: <ClockAlert className="text-yellow-700" />,
          circleColor: "bg-yellow-200",
          cardColor: "bg-yellow-50",
          value: getCantidadByEstado("PENDIENTE"),
          link: "/citas-psicologo",
        },
        {
          title: "Citas Canceladas",
          icon: <BanIcon className="text-red-700" />,
          circleColor: "bg-red-200",
          cardColor: "bg-red-50",
          value: getCantidadByEstado("CANCELADA"),
          link: "/citas-psicologo",
        },
      ];

      setResumenData(resumen);

    } catch (error) {
      console.error("Error al obtener los datos del resumen:", error);
    }
  };

  fetchResumenData();
}, []);
  return (
    <MainLayoutPsicologo>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 auto-rows-max">
            {resumenData.map((item, index) => (
              <ResumenCard key={index} {...item} />
            ))}
          </div>
          <ReunionesContenedor appointments={appointments} />
        </div>
        <div className="flex flex-col gap-6">
          <CalendarioSection date={date} setDate={setDate} />
          <ListaPacientes pacientes={pacientes} />
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default HomePsicologo;
