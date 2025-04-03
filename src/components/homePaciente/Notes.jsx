import React from "react";

const Notes = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Notas</h1>
      <div className="p-6 rounded-xl overflow-y-auto max-h-96">
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
  );
};

export default Notes;
