import { errorMessages } from "./errorMessages";

export const validationRules = {
  nombre: {
    required: errorMessages.validation.required,
    minLength: {
      value: 2,
      message: errorMessages.validation.minLength.replace("{min}", "2"),
    },
    maxLength: {
      value: 50,
      message: errorMessages.validation.maxLength.replace("{max}", "50"),
    },
    pattern: {
      value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      message:
        errorMessages.validation.onlyLetters ||
        "Solo se permiten letras y espacios",
    },
  },
  apellido: {
    required: errorMessages.validation.required,
    minLength: {
      value: 2,
      message: errorMessages.validation.minLength.replace("{min}", "2"),
    },
    maxLength: {
      value: 50,
      message: errorMessages.validation.maxLength.replace("{max}", "50"),
    },
    pattern: {
      value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      message:
        errorMessages.validation.onlyLetters ||
        "Solo se permiten letras y espacios",
    },
  },
  username: {
    required: errorMessages.validation.required,
    minLength: {
      value: 4,
      message: errorMessages.validation.minLength.replace("{min}", "4"),
    },
    maxLength: {
      value: 20,
      message: errorMessages.validation.maxLength.replace("{max}", "20"),
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: errorMessages.validation.username,
    },
  },
  tipoDocumento: {
    required: errorMessages.validation.required,
  },
  documento: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[0-9]+$/,
      message: errorMessages.validation.numeric,
    },
    validate: {
      maxLength: (value) =>
        value.length <= 10 ||
        errorMessages.validation.maxLength.replace("{max}", "10"),

      minValue: (value) => {
        const num = Number(value);
        return (
          num >= 1 ||
          errorMessages.validation.numberTooSmall?.replace("{min}", "1") ||
          "El número es demasiado pequeño"
        );
      },

      maxValue: (value) => {
        const num = Number(value);
        return (
          num <= 2147483647 ||
          errorMessages.validation.numberTooLarge?.replace(
            "{max}",
            "2147483647"
          ) ||
          "El número es demasiado grande"
        );
      },
    },
  },
  fechaNacimiento: {
    required: errorMessages.validation.required,
    validate: {
      validDate: (value) => {
        if (!value) return true;
        const date = new Date(value);
        return (
          !isNaN(date.getTime()) ||
          errorMessages.validation.invalidDate ||
          "Fecha no válida"
        );
      },
      minAge: (value) => {
        if (!value) return true;
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return (
          age >= 18 || errorMessages.validation.minAge.replace("{min}", "18")
        );
      },
      notFuture: (value) => {
        if (!value) return true;
        return (
          new Date(value) <= new Date() ||
          errorMessages.validation.futureDate ||
          "La fecha no puede ser futura"
        );
      },
    },
  },
  email: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: errorMessages.validation.email,
    },
    validate: {
      isGmail: (value) =>
        value.endsWith("@gmail.com") ||
        errorMessages.validation.onlyGmail ||
        "Solo se permiten correos de Gmail",
    },
  },
  password: {
    required: errorMessages.validation.required,
    minLength: {
      value: 6,
      message: errorMessages.validation.password,
    },
    maxLength: {
      value: 30,
      message: errorMessages.validation.maxLength.replace("{max}", "30"),
    },
  },
  especialidad: {
    required: errorMessages.validation.required,
    maxLength: {
      value: 100,
      message: errorMessages.validation.maxLength.replace("{max}", "100"),
    },
  },
  experiencia: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[0-9]+$/,
      message: errorMessages.validation.numeric || "Solo se permiten números",
    },
    maxLength: {
      value: 500,
      message: errorMessages.validation.maxLength.replace("{max}", "500"),
    },
  },
  licencia: {
    required: errorMessages.validation.required,
    pattern: {
      value: /^[0-9]+$/,
      message: errorMessages.validation.numeric || "Solo se permiten números",
    },
    maxLength: {
      value: 6,
      message: errorMessages.validation.maxLength.replace("{max}", "6"),
    },
  },
};
