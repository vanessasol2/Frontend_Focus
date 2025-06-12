import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const crearSesion = async (sesionData) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
    const payload = {
      fechaSesion: sesionData.fechaSesion,
      horaInicio: sesionData.horaInicio,
      horaFin: sesionData.horaFin,
      nombre: sesionData.nombre,
      notasAdicionales: sesionData.notasAdicionales,
      idTerapia: sesionData.idTerapia,      
      idPaciente: sesionData.idPaciente     
    };

    const response = await axios.post(`${API_URL}/sesion/psicologo`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear la sesión:", error.response?.data || error.message);
    throw error;
  }
};

export const cancelarSesion = async (sesionId, datosCancelacion) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
    const response = await axios.delete(
      `${API_URL}/sesion/cancelarSesion/${sesionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: datosCancelacion  
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al cancelar la sesión - Backend response:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error al hacer la petición:", error.message);
    }
    throw error;
  }
};



export const traerSesiones = async (idPaciente) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
     const response = await axios.get(`http://localhost:8081/paciente/sesiones/${idPaciente}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });


    return response.data; 
  } catch (error) {
    console.error("Error al obtener las sesiones:", error.response?.data || error.message);
    throw error; 
  }
};

export const finalizarSesion = async (sesionId, datosFinalizacion = {}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
    const response = await axios.put(
      `${API_URL}/sesion/finalizarSesion/${sesionId}`,
      datosFinalizacion,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al finalizar la sesión:", error);
    throw error;
  }
};




export const traerSesionesCard = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
    const response = await axios.get(`http://localhost:8081/funcionario/sesiones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data.map(sesion => ({
      id: sesion.id,
      nombrePaciente: sesion.nombrePaciente ,
      fechaSesion: sesion.fechaSesion,
      horaInicio: sesion.horaInicio,
      horaFin: sesion.horaFin,
      notas: sesion.descripcion || '',
      estado: sesion.estado || 'PENDIENTE',
      agendadaPorPaciente: sesion.agendadaPorPaciente || false
    }));
    
  } catch (error) {
    console.error("Error al obtener las sesiones:", error.response?.data || error.message);
    throw error; 
  }
};


export const crearTerapia = async (idPaciente, terapiaData) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const response = await axios.post(`${API_URL}/terapia/crear/${idPaciente}`, terapiaData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};


export const getTerapia = async (pacienteId) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  console.log('Token:', token);

  try {
    const response = await axios.get(`${API_URL}/terapia/${pacienteId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    return response.data;
  } catch (error) {
    console.error("Error al obtener la terapia:", error);
    throw error;
  }
};



export const finalizarTerapia = async (terapiaId, datosFinalizacion = {}) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  try {
    const response = await axios.put(
      `${API_URL}/terapia/finalizar/${terapiaId}`,
      datosFinalizacion, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al finalizar la terapia:", error);
    throw error;
  }
};

