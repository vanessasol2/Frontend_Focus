export const validarPaciente = (formData) => {
  const errors = {};

  if (!formData.nombre?.trim()) {
    errors.nombre = "El nombre es obligatorio";
  }
  
  if (!formData.apellido?.trim()) {
    errors.apellido = "El apellido es obligatorio";
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Correo electrónico no válido";
  }

  if (formData.telefono && !/^\d{10}$/.test(formData.telefono.replace(/\D/g, ""))) {
    errors.telefono = "El teléfono debe tener exactamente 10 dígitos";
  }
  
  if (formData.tipoDoc === "CC" && !/^[0-9]{6,12}$/.test(formData.documento)) {
    errors.documento = "Cédula no válida (6-12 dígitos)";
  } else if (formData.tipoDoc === "CE" && !/^[a-zA-Z0-9]{8,11}$/.test(formData.documento)) {
    errors.documento = "Cédula de extranjería no válida";
  }

  return errors;
};