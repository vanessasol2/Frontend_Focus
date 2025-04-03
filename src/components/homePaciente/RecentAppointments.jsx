import React from "react";
import AppointmentCard from "./AppointmentCard";

const RecentAppointments = ({ appointments }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Citas Recientes
      </h1>
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} {...appointment} />
      ))}
    </div>
  );
};

export default RecentAppointments;
