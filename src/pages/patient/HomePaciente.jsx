import React from "react";
import MainLayout from "../../layout/MainLayout";
import Resumen from "../../components/homePaciente/Resumen";
import "../../components/homePaciente/Resumen.css";
import RecentAppointments from "../../components/homePaciente/RecentAppointments";
import Notes from "../../components/homePaciente/Notes";
import { UsersRound, CalendarCheck2, SquareCheckBig, ClockAlert, BookCopy, UserCheck, BanIcon } from "lucide-react";

const HomePaciente = () => {
  const appointments = [
    { client: "Sara Mateus", status: "Completada", time: "1:00pm - 2:30pm", date: "23 Nov 2024" },
    { client: "Sara Mateus", status: "Pendiente", time: "3:00pm - 4:00pm", date: "24 Nov 2024" },
    { client: "Sara Mateus", status: "Cancelada", time: "10:00am - 11:30am", date: "25 Nov 2024" },
  ];

  const resumenData = [
    { title: "Total Citas", bgColor: "#ebe5fc", icon: <CalendarCheck2 style={{ color: "#7b61ff" }} />, stats: [{ icon: <UsersRound />, value: 10 }] },
    { title: "Citas Completadas", bgColor: "#c8e6c9", icon: <SquareCheckBig style={{ color: "#4caf50" }} />, stats: [{ icon: <UserCheck />, value: 4 }] },
    { title: "Citas Pendientes", bgColor: "#fff9c4", icon: <ClockAlert style={{ color: "#fbc02d" }} />, stats: [{ icon: <BookCopy />, value: 5 }] },
    { title: "Citas Canceladas", bgColor: "#ffcdd2", icon: <BanIcon style={{ color: "#e53935" }} />, stats: [{ icon: <BanIcon />, value: 3 }] },
  ];

  return (
    <MainLayout>
      <Resumen resumenData={resumenData} />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-6">
        <RecentAppointments appointments={appointments} />
        <Notes />
      </section>
    </MainLayout>
  );
};

export default HomePaciente;
