import React from 'react';

const ReunionesCard = ({ client, status, time, date }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 cursor-pointer">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-800">{client}</h3>
          <p className="text-gray-500 text-sm">
            {date} | {time}
          </p>
        </div>
        <span
          className={`py-1 px-4 rounded-full text-sm font-medium ${
            status === "Pendiente"
              ? "bg-yellow-100 text-yellow-800"
              : status === "Completada"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ReunionesCard;
