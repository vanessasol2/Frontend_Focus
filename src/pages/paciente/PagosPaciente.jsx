import { useState } from "react";
import MainLayout from "../../layout/paciente/MainLayout";
import Pendientes from "../../components/pago/Pendientes";
import Movimientos from "../../components/pago/Movimientos";

const PagosPaciente = () => {
  const [activeTab, setActiveTab] = useState("pendiente");

  return (
    <MainLayout>
      <div className="p-6 mt-8">
        {/* Botones de Tabs */}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "pendiente" ? "bg-[#5603ad] text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => setActiveTab("pendiente")}
          >
            Pendiente
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "movimientos" ? "bg-[#5603ad] text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => setActiveTab("movimientos")}
          >
            Movimientos
          </button>
        </div>

        {/* Línea separadora */}
        <div className="mt-4 border-t border-gray-300"></div>

        {/* Renderizar componentes según la pestaña activa */}
        {activeTab === "pendiente" ? <Pendientes /> : <Movimientos />}
      </div>
    </MainLayout>
  );
};

export default PagosPaciente;
