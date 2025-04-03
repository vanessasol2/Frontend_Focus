import { useState } from "react";
import {Dialog,DialogBackdrop,DialogPanel, DialogTitle,} from "@headlessui/react";
import { SquareChartGantt } from "lucide-react";

const Pendientes = () => {
  const [open, setOpen] = useState(false);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);

  const pagosPendientes = [
    {
      id: 1,
      tipo: "Sesión en vivo",
      año: "2024",
      mes: "Julio",
      fecha: "15/06/2024",
      valor: "314,300",
    },
    {
      id: 2,
      tipo: "Sesión en Chat",
      año: "2024",
      mes: "Julio",
      fecha: "15/06/2024",
      valor: "314,300",
    },
  ];

  const abrirModal = (pago) => {
    setPagoSeleccionado(pago);
    setOpen(true);
  };

  return (
    <div>
      <h2 className="mt-4 text-lg font-semibold text-gray-800">
        Pagos Pendientes
      </h2>

      {/* Encabezado de la tabla */}
      <div className="grid grid-cols-6 items-center bg-[#dcd4f4] p-3 rounded-t-lg mt-4 font-semibold text-gray-800">
        <p>Tipo</p>
        <p>Año</p>
        <p>Mes</p>
        <p>Fecha</p>
        <p>Valor</p>
        <p className="text-right">Acciones</p>
      </div>

      {/* Tarjetas de pago */}
      <div className="space-y-4">
        {pagosPendientes.map((pago) => (
          <div
            key={pago.id}
            className="grid grid-cols-6 items-center bg-[#f3f0ff] p-4 rounded-xl shadow-sm"
          >
            <p className="text-gray-700">{pago.tipo}</p>
            <p className="text-gray-700">{pago.año}</p>
            <p className="text-gray-700">{pago.mes}</p>
            <p className="text-gray-700">{pago.fecha}</p>
            <p className="text-gray-700">{pago.valor}</p>

            {/* Botones */}
            <div className="flex justify-end gap-2">
              <button className="bg-[#5603ad] text-white px-4 py-1 rounded-lg">
                Pagar
              </button>
              <button
                onClick={() => abrirModal(pago)}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {pagoSeleccionado && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-400/75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start gap-4">
                    <div className="flex items-center justify-center rounded-full bg-[#cab0e5] p-2">
                      <SquareChartGantt className="h-6 w-6 text-[#5603ad]" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-bold text-gray-900 mb-4 text-center sm:text-left"
                      >
                        Detalle del Pago
                      </DialogTitle>
                      <div className="py-1 text-center sm:text-left">
                        <p className="text-sm text-gray-500">
                          Datos de tu pago pendiente
                        </p>
                      </div>

                      {/* Tabla del Detalle del Pago */}
                      <div className="overflow-hidden rounded-lg border border-[#ebe5fc] shadow-sm">
                        <table className="min-w-full bg-white">
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100">
                                Tipo
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {pagoSeleccionado.tipo}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100">
                                Año
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {pagoSeleccionado.año}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100">
                                Mes
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {pagoSeleccionado.mes}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100">
                                Fecha
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {pagoSeleccionado.fecha}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100">
                                Valor
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {pagoSeleccionado.valor}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Pendientes;
