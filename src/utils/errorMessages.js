export const errorMessages = {
  // Autenticación
  'email.not.found': 'Correo electrónico no encontrado',
  'email.use': 'El correo electrónico ya está registrado',
  'email.invalid': 'El correo electrónico no es válido',
  'email.too.short': 'Ingrese un correo electrónico válido',
  
  // Usuarios
  'user.not.found': 'Usuario no encontrado',
  'user.register.success': 'Usuario registrado exitosamente',
  'username.found': 'El nombre de usuario ya está en uso',
  
  // Documentos
  'doc.register': 'Este número de documento ya está registrado',
  'doc.length.invalid': 'El documento no debe tener más de 11 dígitos',
  'document.length.invalid': 'El documento debe tener al menos 8 dígitos',
  
  // Contraseñas
  'password.changed.success': 'Contraseña cambiada con éxito',
  'password.too.short': 'La contraseña debe tener al menos 12 caracteres',
  
  // Funcionarios
  'funcionario.register': 'Funcionario ya registrado',
  'funcionario.not.found': 'Funcionario no encontrado',
  
  // Pacientes
  'patient.not.found': 'Paciente no encontrado',
  'medical.history.found': 'El paciente ya tiene historial clínico',
  'medical.history.not.found': 'Historial clínico no encontrado',
  
  // Validaciones
  'nombre.apellido.required': 'Nombre y apellido son obligatorios',
  'hobby.other.required': 'Debe especificar el hobbie cuando selecciona OTRO',
  'medicine.other.required': 'Debe especificar el medicamento cuando selecciona OTRO',
  'disease.other.required': 'Debe especificar la enfermedad cuando selecciona OTRO',
  'phone.length.invalid': 'El teléfono debe tener 10 dígitos',
  
  // Terapias
  'therapy.not.found': 'Terapia no encontrada',
  'session.time.conflict': 'Horario no disponible para la cita',
  
  // Tokens
  'token.invalid': 'Enlace de verificación no válido',
  'token.expired': 'Enlace de verificación expirado',
  
  // Mensajes positivos
  'password.reset.email.subject': 'Recuperar contraseña',
  'password.reset.email.text': 'Para recuperar tu contraseña haz clic en el siguiente enlace: {0}',
  
  // Errores genéricos
  'validation.error': 'Error de validación',
  'server.error': 'Error interno del servidor',
  'network.error': 'Problema de conexión. Verifique su internet',

  // Validaciones 
  validation: {
    required: 'Este campo es obligatorio',
    minLength: 'Debe tener al menos {min} caracteres',
    maxLength: 'No puede exceder los {max} caracteres',
    email: 'Ingrese un correo electrónico válido',
    onlyGmail: "Solo se permiten correos electrónicos de Gmail",
    numeric: 'Solo se permiten números',
    username: 'Solo letras, números y guiones bajos',
    licencia: 'Solo letras, números y guiones',
    password: 'Mínimo 6 caracteres',
    invalidDate: 'Fecha no válida',
    minAge: 'Debes tener al menos {min} años',
    futureDate: 'La fecha no puede ser futura'
  }
};

export const getBackendMessage = (error, params = [], debug = false) => {
  if (typeof error === 'string') {
    return formatMessage(error, params);
  }
  if (error.isAxiosError) {
    if (!error.response) {
      return errorMessages['network.error'];
    }
    
    const { data, status } = error.response;
    
    if (data?.errorCode && errorMessages[data.errorCode]) {
      return formatMessage(errorMessages[data.errorCode], params);
    }

    if (data?.message) {
      const backendCode = Object.keys(errorMessages).find(
        key => data.message.includes(key.replace(/\./g, ' '))
      );
      if (backendCode) {
        return formatMessage(errorMessages[backendCode], params);
      }
    
      if (debug) return data.message;
    }
    
    switch(status) {
      case 400: return errorMessages['validation.error'];
      case 401: return 'No autorizado';
      case 403: return 'Acceso denegado';
      case 404: return 'Recurso no encontrado';
      case 409: return errorMessages['doc.register'] || 'Conflicto de datos';
      case 422: return errorMessages['validation.error'];
      default: return errorMessages['server.error'];
    }
  }
  return debug ? error.message : errorMessages['server.error'];
};

const formatMessage = (errorCode, params = []) => {
  const messageTemplate = errorMessages[errorCode] || errorCode;
  
  return params.reduce((msg, param, index) => 
    msg.replace(new RegExp(`\\{${index}\\}`, 'g'), param), 
    messageTemplate
  );
};