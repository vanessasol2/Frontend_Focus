export const ESTADOS = {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo'
  };
  
  export const generarPacientesEjemplo = (cantidad) => {
    const nombres = ['María', 'Carlos', 'Ana', 'Luis', 'Sofía', 'Jorge', 'Elena', 'Pedro'];
    const apellidos = ['Gómez', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Pérez', 'García'];
  
    return Array.from({ length: cantidad }, (_, i) => {
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
  
      return {
        id: `PAC-${1000 + i}`,
        nombre: `${nombre} ${apellido}`,
        correo: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@ejemplo.com`,
        tieneCitasPendientes: Math.random() < 0.5,
        estado: Math.random() < 0.8 ? ESTADOS.ACTIVO : ESTADOS.INACTIVO,
        ultimaVisita: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
          .toLocaleDateString('es-ES')
      };
    });
  };
  