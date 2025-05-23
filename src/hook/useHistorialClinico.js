import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { historialClinicoService } from "../service/historialClinicoService";

const HOBBIES_OPTIONS = [
  { value: 'DEPORTE', label: 'Deporte' },
  { value: 'LECTURA', label: 'Lectura' },
  { value: 'VIDEOJUEGOS', label: 'Videojuegos' },
  { value: 'MUSICA', label: 'Música' },
  { value: 'COCINA', label: 'Cocina' },
  { value: 'OTRO', label: 'Otro' }
];

const MEDICAMENTOS_OPTIONS = [
  { value: 'Metformina', label: 'Metformina' },
  { value: 'Losartán', label: 'Losartán' },
  { value: 'Salbutamol', label: 'Salbutamol' },
  { value: 'Fluoxetina', label: 'Fluoxetina' },
  { value: 'Alprazolam', label: 'Alprazolam' },
  { value: 'Ibuprofeno', label: 'Ibuprofeno' },
  { value: 'Aspirina', label: 'Aspirina' },
  { value: 'Paracetamol', label: 'Paracetamol' },
  { value: 'Amoxicilina', label: 'Amoxicilina' },
  { value: 'Ciprofloxacino', label: 'Ciprofloxacino' },
  { value: 'Omeprazol', label: 'Omeprazol' },
  { value: 'Simvastatina', label: 'Simvastatina' },
  { value: 'Lisinopril', label: 'Lisinopril' },
  { value: 'Sertralina', label: 'Sertralina' },
  { value: 'Diazepam', label: 'Diazepam' },
  { value: 'Otro', label: 'Otro' }
];

const ENFERMEDADES_OPTIONS = [
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Hipertension', label: 'Hipertensión' },
  { value: 'Asma', label: 'Asma' },
  { value: 'Depresion', label: 'Depresión' },
  { value: 'Ansiedad', label: 'Ansiedad' },
  { value: 'Artritis', label: 'Artritis' },
  { value: 'Migrana', label: 'Migraña' },
  { value: 'Esquizofrenia', label: 'Esquizofrenia' },
  { value: 'TDAH', label: 'TDAH' },
  { value: 'Autismo', label: 'Autismo' },
  { value: 'Epilepsia', label: 'Epilepsia' },
  { value: 'Cancer', label: 'Cáncer' },
  { value: 'EnfermedadCardiaca', label: 'Enfermedad cardiaca' },
  { value: 'Obesidad', label: 'Obesidad' },
  { value: 'Alzheimer', label: 'Alzheimer' },
  { value: 'ninguna', label: 'Ninguna' },
  { value: 'otro', label: 'Otro' }
];

export const useHistorialClinico = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [historial, setHistorial] = useState({
    hobbies: [],
    otroHobbie: '',
    medicamentos: [],
    otroMedicamento: '',
    enfermedades: [],
    otraEnfermedad: '',
    ocupacion: '',
    observacionesGenerales: '',
    contactoEmergencia: {
      nombre: '',
      apellido: '',
      parentesco: '',
      telefono: '',
      correo: ''
    }
  });

  useEffect(() => {
    if (!pacienteId) {
      setError('No se encontró el ID del paciente');
      toast.error('No se encontró el ID del paciente');
    }
  }, [pacienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contactoEmergencia.')) {
      const field = name.split('.')[1];
      setHistorial(prev => ({
        ...prev,
        contactoEmergencia: {
          ...prev.contactoEmergencia,
          [field]: value
        }
      }));
    } else {
      setHistorial(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (type, value) => {
    setHistorial(prev => {
      const currentArray = [...prev[type]];
      const index = currentArray.indexOf(value);
      
      if (index === -1) {
        currentArray.push(value);
      } else {
        currentArray.splice(index, 1);
        if (value === 'OTRO' && type === 'hobbies') {
          return { ...prev, [type]: currentArray, otroHobbie: '' };
        } else if (value === 'Otro' && type === 'medicamentos') {
          return { ...prev, [type]: currentArray, otroMedicamento: '' };
        } else if (value === 'otro' && type === 'enfermedades') {
          return { ...prev, [type]: currentArray, otraEnfermedad: '' };
        }
      }
      return { ...prev, [type]: currentArray };
    });
  };

  const validarFormulario = () => {
    if (!historial.contactoEmergencia.nombre || !historial.contactoEmergencia.telefono) {
      toast.error('Nombre y teléfono de contacto de emergencia son obligatorios');
      return false;
    }
    if (!historial.ocupacion) {
      toast.error('La ocupación es obligatoria');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pacienteId) {
      toast.error('ID de paciente no definido');
      return;
    }

    if (!validarFormulario()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const dataToSend = {
        hobbies: historial.hobbies,
        otroHobbie: historial.hobbies.includes('OTRO') ? historial.otroHobbie || null : null,
        medicamentos: historial.medicamentos,
        otroMedicamento: historial.medicamentos.includes('Otro') ? historial.otroMedicamento || null : null,
        enfermedades: historial.enfermedades,
        otraEnfermedad: historial.enfermedades.includes('otro') ? historial.otraEnfermedad || null : null,
        ocupacion: historial.ocupacion,
        observacionesGenerales: historial.observacionesGenerales,
        contactoEmergencia: historial.contactoEmergencia
      };

      await historialClinicoService.crearHistorial(pacienteId, dataToSend, token);

      toast.success('Historial clínico guardado con éxito');
      setTimeout(() => navigate('/pacientes'), 2000);

    } catch (error) {
      let errorMessage = 'Error al guardar el historial';
      
      if (error.status === 403) {
        errorMessage = 'Acceso denegado. Tu sesión puede haber expirado.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    historial,
    loading,
    error,
    pacienteId,
    HOBBIES_OPTIONS,
    MEDICAMENTOS_OPTIONS,
    ENFERMEDADES_OPTIONS,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  };
};