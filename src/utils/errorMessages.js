export function getBackendMessage(error) {
  const data = error?.response?.data;
  switch (data?.code) {
    case "doc.register":
      return "Este número de documento ya está registrado.";
    default:
      return (
        data?.message || 
        data?.code ||    
        error?.message ||                
        "Ocurrió un error inesperado. Intenta nuevamente." 
      );
  }
}

export const errorMessages = {
  validation: {
    required: "Este campo es obligatorio.",
    minLength: "Debe tener al menos {min} caracteres.",
    maxLength: "No debe superar {max} caracteres.",
    onlyLetters: "Solo se permiten letras y espacios.",
    username: "Nombre de usuario inválido.",
    numeric: "Solo se permiten números.",
    numberTooSmall: "El número debe ser mayor o igual a {min}.",
    numberTooLarge: "El número debe ser menor o igual a {max}.",
    invalidDate: "Fecha no válida.",
    minAge: "Debes tener al menos {min} años.",
    futureDate: "La fecha no puede ser futura.",
    email: "Correo electrónico no válido.",
    onlyGmail: "Solo se permiten correos de Gmail.",
    password: "La contraseña debe tener entre 6 y 30 caracteres.",
  },
};
