export const TIPOS_DOCUMENTO = [
  { value: "CC", label: "Cédula de Ciudadanía" }, 
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "PA", label: "Pasaporte" },
  { value: "RC", label: "Registro Civil" },
];


export const EXPRESIONES_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  GMAIL: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  TELEFONO: /^\d{10}$/,
  CC: /^[0-9]{6,12}$/,
  CE: /^[a-zA-Z0-9]{8,11}$/,
  EXPRESION_SOLO_LETRAS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  SOLO_NUMEROS: /^[0-9]+$/,
};