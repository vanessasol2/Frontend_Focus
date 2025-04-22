import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";
import FiltroCrear from "./FiltroCrear";
import { Toaster, toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { getBackendMessage } from "../../utils/errorMessages";


const EXPRESION_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXPRESION_TELEFONO = /^[0-9]{10,15}$/;
const EXPRESION_CC = /^[0-9]{6,12}$/;
const EXPRESION_CE = /^[a-zA-Z0-9]{5,20}$/;


const TIPOS_DOCUMENTO = [
  { valor: "CC", etiqueta: "Cédula de Ciudadanía" },
  { valor: "CE", etiqueta: "Cédula de Extranjería" },
  { valor: "TI", etiqueta: "Tarjeta de Identidad" },
  { valor: "PA", etiqueta: "Pasaporte" },
  { valor: "RC", etiqueta: "Registro Civil" },
];


const CAMPOS_FORMULARIO = [
  {
    nombre: "nombre",
    etiqueta: "Nombre(s)",
    tipo: "text",
    ejemplo: "Ingresa el nombre del paciente",
    requerido: true,
    title: "Ingresa el nombre del paciente",
  },
  {
    nombre: "apellido",
    etiqueta: "Apellido(s)",
    tipo: "text",
    ejemplo: "Ingresa el apellido del paciente",
    requerido: true,
    title: "Ingresa el apellido del paciente",
  },
  {
    nombre: "tipoDoc",
    etiqueta: "Tipo de Documento",
    tipo: "select",
    opciones: TIPOS_DOCUMENTO,
    requerido: true,
    title: "Selecciona el tipo de documento",
  },
  {
    nombre: "documento",
    etiqueta: "Número de Documento",
    tipo: "text",
    ejemplo: "Ingresa el número de documento del paciente",
    requerido: true,
    title: "Ingresa el número de documento del paciente",
  },
  {
    nombre: "fechaNacimiento",
    etiqueta: "Fecha de Nacimiento",
    tipo: "date",
    requerido: true,
    title: "Selecciona la fecha de nacimiento",
  },
  {
    nombre: "telefono",
    etiqueta: "Teléfono",
    tipo: "tel",
    ejemplo: "Ingresa el número de teléfono del paciente",
    requerido: true,
    title: "Ingresa el número de teléfono",
  },
  {
    nombre: "email",
    etiqueta: "Correo Electrónico",
    tipo: "email",
    ejemplo: "Ingresa un correo electrónico válido del paciente",
    requerido: true,
    title: "Ingresa un correo electrónico válido",
  },
];

const CrearPaciente = () => {
  const navegar = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState(
    CAMPOS_FORMULARIO.reduce((acc, campo) => {
      acc[campo.nombre] = "";
      return acc;
    }, {})
  );

  const [errores, setErrores] = useState({});
  const [estaEnviando, setEstaEnviando] = useState(false);

  const manejarCambio = useCallback(
    (e) => {
      const { name, value } = e.target;
      setDatosFormulario((prev) => ({ ...prev, [name]: value }));
      if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
    },
    [errores]
  );

  const validarFormulario = useCallback(() => {
    const erroresTemporales = {};

    CAMPOS_FORMULARIO.forEach((campo) => {
      if (campo.requerido && !datosFormulario[campo.nombre]?.trim()) {
        erroresTemporales[campo.nombre] = "Este campo es obligatorio";
      }
    });

    if (datosFormulario.email && !EXPRESION_EMAIL.test(datosFormulario.email)) {
      erroresTemporales.email = "Correo electrónico no válido";
    }

    if (
      datosFormulario.telefono &&
      !EXPRESION_TELEFONO.test(datosFormulario.telefono)
    ) {
      erroresTemporales.telefono = "Teléfono no válido (10-15 dígitos)";
    }

    if (
      datosFormulario.tipoDoc === "CC" &&
      !EXPRESION_CC.test(datosFormulario.documento)
    ) {
      erroresTemporales.documento = "Cédula no válida (6-12 dígitos)";
    } else if (
      datosFormulario.tipoDoc === "CE" &&
      !EXPRESION_CE.test(datosFormulario.documento)
    ) {
      erroresTemporales.documento = "Cédula de extranjería no válida";
    }

    return erroresTemporales;
  }, [datosFormulario]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const erroresFormulario = validarFormulario();

    if (Object.keys(erroresFormulario).length > 0) {
      setErrores(erroresFormulario);
      toast.error("Por favor completa correctamente todos los campos");
      return;
    }

    setEstaEnviando(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/paciente/registrar",
        datosFormulario,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successMessage = response.data?.message || "Paciente creado exitosamente";
      toast.success(successMessage);
      navegar("/pacientes");
    } catch (error) {
      const errorMessage = getBackendMessage(error);
      
      if (error.response?.status === 409) {
        if (errorMessage.toLowerCase().includes("correo")) {
          setErrores((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.toLowerCase().includes("documento")) {
          setErrores((prev) => ({ ...prev, documento: errorMessage }));
        }
      }

      toast.error(errorMessage, {
        action: {
          label: "Reintentar",
          onClick: () => manejarEnvio(e),
        },
      });
    } finally {
      setEstaEnviando(false);
    }
  };

  const renderizarCampo = ({ nombre, etiqueta, tipo, ejemplo, opciones }) => (
    <div key={nombre} className="mb-4">
      <label
        htmlFor={nombre}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {etiqueta}{" "}
        {CAMPOS_FORMULARIO.find((c) => c.nombre === nombre)?.requerido && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {tipo === "select" ? (
        <div className="relative">
          <select
            id={nombre}
            name={nombre}
            value={datosFormulario[nombre]}
            onChange={manejarCambio}
            className={`block w-full pl-3 pr-10 py-2.5 border ${
              errores[nombre]
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400 focus:border-primary-color"
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-color/30 appearance-none transition-all`}
            aria-invalid={!!errores[nombre]}
            aria-describedby={errores[nombre] ? `${nombre}-error` : undefined}
          >
            <option value="" disabled className="text-gray-400">
              Seleccione una opción
            </option>
            {opciones.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              errores[nombre] ? "text-red-500" : "text-gray-400"
            } pointer-events-none`}
          />
        </div>
      ) : (
        <input
          id={nombre}
          name={nombre}
          type={tipo}
          value={datosFormulario[nombre]}
          onChange={manejarCambio}
          placeholder={ejemplo}
          title={ejemplo}
          className={`w-full px-3 py-2.5 border rounded-lg ${
            errores[nombre]
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400 focus:border-primary-color"
          } focus:outline-none focus:ring-2 focus:ring-primary-color/30 transition-all`}
          max={
            nombre === "fechaNacimiento"
              ? new Date().toISOString().split("T")[0]
              : undefined
          }
          aria-invalid={!!errores[nombre]}
          aria-describedby={errores[nombre] ? `${nombre}-error` : undefined}
        />
      )}

      {errores[nombre] && (
        <p id={`${nombre}-error`} className="mt-1 text-sm text-red-500">
          {errores[nombre]}
        </p>
      )}
    </div>
  );

  return (
    <MainLayoutPsicologo>
      <Toaster richColors position="top-center" />
      <div className="p-4 mt-7">
        <FiltroCrear />

        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Registrar Nuevo Paciente
          </h1>

          <form onSubmit={manejarEnvio} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAMPOS_FORMULARIO.map(renderizarCampo)}
            </div>

            <div className="flex justify-end pt-4 space-x-3">
              <button
                type="button"
                onClick={() => navegar(-1)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={estaEnviando}
                className="px-4 py-2.5 bg-primary-color text-white rounded-lg hover:bg-secundary-color 
                disabled:bg-primary-color/70 flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
              >
                {estaEnviando ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
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