import { useDocumentTipo } from "../../../hooks/useDocumentTipo";


export const useCamposFormulario = () => {
  const { tiposDocumento } = useDocumentTipo();
  
  return [
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
      opciones: tiposDocumento,
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
};