import React from 'react';
import MainLayoutPsicologo from "../../layout/psicologo/MainLayoutPsicologo";
import FiltroCrear from "./FiltroCrear";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";
import { usePacienteForm } from "../../hook/usePacienteForm"
const CrearPaciente = () => {
  const {
    datosFormulario,
    errores,
    estaEnviando,
    manejarCambio,
    manejarEnvio,
    CAMPOS_FORMULARIO,
    navegar,
  } = usePacienteForm();

  const renderizarCampo = ({ nombre, etiqueta, tipo, ejemplo, opciones, descripcion }) => (
    <div key={nombre} className="mb-5">
      <div className="flex justify-between items-baseline">
        <label
          htmlFor={nombre}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {etiqueta}
          {CAMPOS_FORMULARIO.find((c) => c.nombre === nombre)?.requerido && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
        {descripcion && (
          <span className="text-xs text-gray-500">{descripcion}</span>
        )}
      </div>

      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={datosFormulario[nombre]}
        onChange={manejarCambio}
        placeholder={ejemplo}
        title={ejemplo}
        className={`w-full px-3 py-2.5 text-sm border rounded-lg ${errores[nombre]
            ? "border-red-500 bg-red-50 focus:ring-red-200"
            : "border-gray-300 hover:border-primary-color focus:border-primary-color"
          } focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all`}
        max={
          nombre === "fechaNacimiento"
            ? new Date().toISOString().split("T")[0]
            : undefined
        }
        aria-invalid={!!errores[nombre]}
        aria-describedby={errores[nombre] ? `${nombre}-error` : undefined}
        disabled={estaEnviando}
      />

      {errores[nombre] && (
        <p id={`${nombre}-error`} className="mt-1 text-xs text-red-600">
          {errores[nombre]}
        </p>
      )}
    </div>
  );

  return (
    <MainLayoutPsicologo>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: { fontFamily: 'inherit', fontSize: '0.875rem' },
          duration: 10000
        }}
      />

      <div className="p-4 md:p-6 mt-4">
        <FiltroCrear />

        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Registrar Nuevo Paciente
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl">
              Complete todos los campos obligatorios (<span className="text-red-500">*</span>) para registrar un nuevo paciente
            </p>

          </div>

          <form onSubmit={manejarEnvio} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {CAMPOS_FORMULARIO.map(renderizarCampo)}
            </div>

            <div className="flex justify-end pt-6 space-x-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  if (Object.values(datosFormulario).some(val => val !== '')) {
                    console.log(datosFormulario)
                    toast('¿Seguro que deseas cancelar? Los datos no guardados se perderán.', {
                      action: {
                        label: 'Confirmar',
                        onClick: () => navegar(-1)
                      },
                      cancel: {
                        label: 'Continuar editando'
                      }
                    });
                  } else {
                    navegar(-1);
                  }
                }}
                className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={estaEnviando}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={estaEnviando}
                className="px-5 py-2.5 text-sm font-medium bg-primary-color text-white rounded-lg hover:bg-secundary-color
                disabled:bg-primary-400 flex items-center justify-center transition-colors shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color"
              >
                {estaEnviando ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Procesando...
                  </>
                ) : (
                  "Registrar Paciente"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CrearPaciente;