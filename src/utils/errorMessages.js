export const errorMessages = {
  // Mensajes del backend
  'email.not.found': 'Correo electrónico no encontrado',
  'email.use': 'El correo ya se encuentra registrado',
  'doc.register': 'Este número de documento ya está registrado',
  'user.not.found': 'Usuario no encontrado',
  'password.changed.success': 'Contraseña cambiada con éxito',
  
  // Mensajes de validación del frontend
  'validation.required': 'Este campo es obligatorio',
  'validation.email': 'Correo electrónico no válido',
  'validation.phone': 'Teléfono no válido (10-15 dígitos)',
  'validation.cc': 'Cédula no válida (6-12 dígitos)',
  'validation.ce': 'Cédula de extranjería no válida',
  'validation.minLength': 'Debe tener al menos {min} caracteres',
  'validation.maxLength': 'No puede exceder los {max} caracteres',
  'validation.username': 'Solo letras, números y guiones bajos',
  'validation.licencia': 'Solo letras, números y guiones',
  'validation.password': 'Mínimo 6 caracteres',
};

export const getBackendMessage = (error) => {
  if (!error.response) {
    return errorMessages['validation.connection'] || 'Error de conexión con el servidor';
  }

  const { data, status } = error.response;

  
  if (data.message) {
    
    const knownKey = Object.keys(errorMessages).find(key => 
      data.message.toLowerCase().includes(key.replace(/\./g, ' ').toLowerCase())
    );
    return knownKey ? errorMessages[knownKey] : data.message;
  }

  
  if (data.errorCode) {
    return errorMessages[data.errorCode] || data.errorCode;
  }

  
  switch (status) {
    case 400: 
      return data.error || errorMessages['doc.register'] || 'Solicitud incorrecta';
    case 401: return 'No autorizado - Por favor inicia sesión';
    case 403: return errorMessages['email.use'] || 'Acceso denegado';
    case 404: return 'Recurso no encontrado';
    case 409: return errorMessages['doc.register'] || 'Conflicto - El recurso ya existe';
    case 422: return 'Datos de entrada no válidos';
    case 500: return 'Error interno del servidor';
    default: return `Error desconocido (código ${status})`;
  }
};