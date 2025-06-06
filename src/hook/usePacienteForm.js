import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { pacienteMetodoService } from "../service/pacienteMetodoService";
import { getBackendMessage } from "../utils/errorMessages";
import { EXPRESIONES_REGEX } from "../utils/constants";

export const usePacienteForm = () => {
  const navegar = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    fechaNacimiento: "",
    telefono: "",
    email: "",
  });

  const [errores, setErrores] = useState({});
  const [estaEnviando, setEstaEnviando] = useState(false);
  const capitalizeLetters = (str) => {
    return str.replace(/\b([a-zA-Z])/g, (match) => match.toUpperCase());
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const processedValue =
      name === "email" ? value.toLowerCase() : capitalizeLetters(value);
    setDatosFormulario({ ...datosFormulario, [name]: processedValue });

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validarCampo = (nombre, valor) => {
    if (!valor.trim()) return "Este campo es obligatorio";

    switch (nombre) {
      case "nombre":
      case "apellido":
        if (!EXPRESIONES_REGEX.EXPRESION_SOLO_LETRAS.test(valor)) {
          return "Solo se permiten letras y espacios";
        }
        break;

      case "documento":
        if (
          datosFormulario.tipoDoc === "CC" &&
          !EXPRESIONES_REGEX.CC.test(valor)
        ) {
          return "Cédula no válida (10 dígitos)";
        }
        break;

      case "telefono":
        if (!EXPRESIONES_REGEX.TELEFONO.test(valor)) {
          return "Teléfono no válido. Solo números (10 dígitos)";
        }
        break;

      case "email":
        if (!EXPRESIONES_REGEX.GMAIL.test(valor)) {
          return "Por favor ingresa un correo de Gmail válido (ej: usuario@gmail.com)";
        }
        break;

      default:
        break;
    }

    return "";
  };

  const validarFormulario = useCallback(() => {
    const nuevosErrores = {};
    let hayErrores = false;

    Object.keys(datosFormulario).forEach((campo) => {
      const error = validarCampo(campo, datosFormulario[campo]);
      if (error) {
        nuevosErrores[campo] = error;
        hayErrores = true;
      }
    });

    setErrores(nuevosErrores);
    return hayErrores;
  }, [datosFormulario]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setEstaEnviando(true);
    try {
      const token = localStorage.getItem("token");
      const response = await pacienteMetodoService.registrarPaciente(
        datosFormulario,
        token
      );

      toast.success("Paciente registrado exitosamente", {
        duration: 10000,
        position: "top-center",
        action: {
          label: "Cerrar",
          onClick: () => toast.dismiss(),
        },
        dismissible: false,
      });
      navegar(`/pacientes/${response.data.idPaciente}/historial`);
    } catch (error) {
      console.error("Error al crear paciente:", error);
      const errorMessage = getBackendMessage(error);

      if (error.status === 409) {
        const campo = errorMessage.toLowerCase().includes("correo")
          ? "email"
          : errorMessage.toLowerCase().includes("documento")
          ? "documento"
          : null;
        if (campo) setErrores((prev) => ({ ...prev, [campo]: errorMessage }));
      }

      toast.error(errorMessage);
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
    CAMPOS_FORMULARIO: [
      {
        nombre: "nombre",
        etiqueta: "Nombre(s)",
        tipo: "text",
        ejemplo: "Ingresa el nombre del paciente",
        requerido: true,
        title: "Ingresa el nombre del paciente (solo letras)",
      },
      {
        nombre: "apellido",
        etiqueta: "Apellido(s)",
        tipo: "text",
        ejemplo: "Ingresa el apellido del paciente",
        requerido: true,
        title: "Ingresa el apellido del paciente (solo letras)",
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
    ],
    navegar,
  };
};
