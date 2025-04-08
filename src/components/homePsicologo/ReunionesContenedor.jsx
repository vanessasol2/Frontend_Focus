import React from "react";
import ReunionesCard from "./ReunionesCard";

const ReunionesContenedor = ({ appointments }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Mis reuniones
      </h1>
      {appointments.map((appointment, index) => (
        <ReunionesCard key={index} {...appointment} />
      ))}
    </div>
  );
};

export default ReunionesContenedor;
