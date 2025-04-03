import React from "react";
import MainLayout from "../../layout/MainLayout";
import Resumen from "../../components/homePaciente/Resumen"
import "../../components/homePaciente/Resumen.css";
import { UsersRound,CalendarCheck2,SquareCheckBig,ClockAlert,BookCopy,UserCheck,BanIcon } from "lucide-react";



const HomePsicologo = () => {
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

  

  const resumenData = [
    {
        title: "Total Citas",
        bgColor: "#ebe5fc",
        icon: <CalendarCheck2 style={{ color: "#7b61ff" }} />,
        stats: [
            { icon: <UsersRound />, value: 10 }
        ]
    },
    {
        title: "Citas Completadas",
        bgColor: "#c8e6c9",
        icon: <SquareCheckBig style={{ color: "#4caf50" }} />,
        stats: [
            { icon: <UserCheck />, value: 4 }
        ]
    },
    {
        title: "Citas Pendientes",
        bgColor: "#fff9c4",
        icon: <ClockAlert style={{ color: "#fbc02d" }} />,
        stats: [
            { icon: <BookCopy/>, value: 5 }
        ]
    },
    {
        title: "Citas Canceladas",
        bgColor: "#ffcdd2",
        icon: <BanIcon style={{ color: "#e53935" }} />,
        stats: [
            { icon: <BanIcon />, value: 3 }
        ]
    }
];
  

  return (
    <MainLayout>
      
      {/* Sección de Resumen */}
      <Resumen resumenData={resumenData} />
      
      {/* Sección de Citas Recientes y Notas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-6">
        {/* Citas Recientes */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Citas Recientes
          </h1>
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {appointment.client}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {appointment.date} | {appointment.time}
                  </p>
                </div>
                <span
                  className={`py-1 px-4 rounded-full text-sm font-medium ${
                    appointment.status === "Pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : appointment.status === "Completada"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Notas */}
        <div>
          <h1 className="text-2xl font-semibold  text-gray-700 mb-6">Notas</h1>
          <div className=" p-6 rounded-xl  overflow-y-auto max-h-96">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="bg-[#ebe5fc] p-4 rounded-lg shadow mb-4 last:mb-0"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Nota {index + 1}
                </h3>
                <p className="text-sm text-gray-600">
                  Esta es la nota número {index + 1}. Muy bien
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePsicologo;
