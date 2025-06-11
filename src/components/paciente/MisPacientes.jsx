import React, { useEffect, useState, useMemo } from "react";
import { Plus, User, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import FiltrosPacientes from "../../components/paciente/FiltrosPacientes";
import TarjetaPaciente from "../../components/paciente/TarjetaPaciente";
import { getPacientesPaginados } from "../../service/pacienteMetodoService";

const MisPacientes = () => {
  const [busqueda, setBusqueda] = useState("");
  const [data, setData] = useState({
    pacientes: [],
    paginacion: {
      totalPages: 0,
      totalElements: 0,
      currentPage: 0,
      pageSize: 10,
      isFirst: true,
      isLast: true
    }
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        setCargando(true);
        const response = await getPacientesPaginados();
        setData({
          pacientes: response.pacientes,
          paginacion: response.paginacion
        });
      } catch (err) {
        console.error("Error cargando pacientes:", err);
        setError(err.message || 'Error al cargar los pacientes');
        setData({
          pacientes: [],
          paginacion: {
            totalPages: 0,
            totalElements: 0,
            currentPage: 0,
            pageSize: 10,
            isFirst: true,
            isLast: true
          }
        });
      } finally {
        setCargando(false);
      }
    };

    cargarPacientes();
  }, []);

  const handlePageChange = async (newPage) => {
    try {
      setCargando(true);
      const response = await getPacientesPaginados(newPage);
      setData({
        pacientes: response.pacientes,
        paginacion: response.paginacion
      });
    } catch (err) {
      console.error("Error cambiando página:", err);
      setError(err.message || 'Error al cambiar de página');
    } finally {
      setCargando(false);
    }
  };

  const pacientesFiltrados = useMemo(() => {
    if (!Array.isArray(data.pacientes)) return [];
    
    return busqueda
      ? data.pacientes.filter(paciente => {
          const nombre = paciente.nombrePaciente?.toLowerCase() || '';
          const correo = paciente.email?.toLowerCase() || '';
          return nombre.includes(busqueda.toLowerCase()) || 
                 correo.includes(busqueda.toLowerCase());
        })
      : data.pacientes;
  }, [data.pacientes, busqueda]);

  const hayResultados = pacientesFiltrados.length > 0;
  const hayPacientes = data.paginacion.totalElements > 0;

  if (error) {
    return (
      <div className="mt-7 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <h3 className="font-medium">Error al cargar pacientes</h3>
        </div>
        <p className="mt-2 text-sm text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="mt-7">
      <FiltrosPacientes 
        valorBusqueda={busqueda} 
        onChangeBusqueda={(e) => setBusqueda(e.target.value)} 
      />
      
      {cargando ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {hayResultados ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pacientesFiltrados.map((paciente) => (
                  <TarjetaPaciente 
                    key={paciente.id} 
                    paciente={paciente} 
                  />
                ))}
              </div>
              
              {/* Paginación */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Mostrando {data.pacientes.length} de {data.paginacion.totalElements} pacientes
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(data.paginacion.currentPage - 1)}
                    disabled={data.paginacion.isFirst}
                    className={`p-2 rounded-md border ${data.paginacion.isFirst ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-primary-color hover:bg-gray-50'}`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  <span className="px-3 py-1 bg-white text-sm">
                    Página {data.paginacion.currentPage + 1} de {data.paginacion.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(data.paginacion.currentPage + 1)}
                    disabled={data.paginacion.isLast}
                    className={`p-2 rounded-md border ${data.paginacion.isLast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-primary-color hover:bg-gray-50'}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-4">
                <User className="text-violet-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                {hayPacientes 
                  ? `No hay resultados para "${busqueda}"`
                  : "No hay pacientes registrados"}
              </h3>
              <p className="text-gray-500 mt-1">
                {hayPacientes 
                  ? "Prueba con otros términos de búsqueda"
                  : "Comienza agregando tu primer paciente"}
              </p>
              <Link 
                to="/crear-paciente" 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary-color hover:bg-secundary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <Plus size={16} className="mr-1" />
                Agregar nuevo paciente
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MisPacientes;