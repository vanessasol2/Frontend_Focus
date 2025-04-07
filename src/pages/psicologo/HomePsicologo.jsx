import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import {CalendarCheck2,SquareCheckBig,ClockAlert,UserCheck,BanIcon,User,} from "lucide-react";
import "../../components/homePsicologo/Calendario.css";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";

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

  return (
    <MainLayoutPsicologo>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-8">
        {/* Tarjetas resumen */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
          {resumenData.map((item, index) => (
            <Link
              key={index}
              to={item.link || "#"}
              className={`rounded-2xl shadow-sm p-5 hover:shadow-md transition duration-300 w-full h-auto ${item.cardColor}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${item.circleColor}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.value} Citas</p>
                </div>
              </div>

              <hr className="my-3 border-gray-300" />

              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-500">
                    {item.context || "Ver detalle"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Calendario + Pacientes */}
        <div className="flex flex-col gap-6">
          {/* Calendario */}
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Calendario</h2>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} className="w-full" />
          </div>

          {/* Pacientes */}
          <div className="p-3 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pacientes</h2>

            {/* Buscador */}
            <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-inner mb-4">
              <User className="w-5 h-5 text-violet-500 mr-2" />
              <input
                type="text"
                placeholder="Buscar Paciente"
                className="flex-1 outline-none bg-transparent text-sm"
              />
              <button className="bg-[#5603ad] text-white text-sm px-3 py-1 rounded-lg hover:bg-[#47038C]">
                Buscar
              </button>
            </div>

            {/* Lista de pacientes */}
            <ul className="space-y-3">
              {pacientes.map((paciente, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{paciente}</p>
                      <p className="text-sm text-gray-500">Historia Clínica</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default HomePsicologo;
