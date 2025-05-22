import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getBackendMessage } from "../../../utils/errorMessages";

const EXPRESION_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXPRESION_TELEFONO = /^\d{10}$/;
const EXPRESION_CC = /^[0-9]{6,12}$/;
const EXPRESION_CE = /^[a-zA-Z0-9]{8,11}$/;

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

export const usePacienteForm = () => {
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
      !EXPRESION_TELEFONO.test(datosFormulario.telefono.replace(/\D/g, ""))
    ) {
      erroresTemporales.telefono = "El teléfono debe tener exactamente 10 dígitos";
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
            Authorization: `Bearer ${token}`
          },
        }
      );

      const successMessage = response.data?.message || "Paciente creado exitosamente";
      toast.success(successMessage);

      const nuevoPacienteId = response.data.idPaciente;

      console.log("ID extraído del paciente:", nuevoPacienteId);

      if (!nuevoPacienteId) {
        console.error("No se encontró el ID del paciente en la respuesta");
        toast.error("Error: No se pudo obtener el ID del paciente creado");
        return;
      }

      navegar(`/pacientes/${nuevoPacienteId}/historial`);
    } catch (error) {
      console.error("Error al crear paciente:", error);
      console.error("Respuesta de error:", error.response?.data);

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

  return {
    datosFormulario,
    errores,
    estaEnviando,
    manejarCambio,
    manejarEnvio,
    CAMPOS_FORMULARIO,
    navegar,
  };
}