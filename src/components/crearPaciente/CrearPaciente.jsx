import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";
import FiltroCrear from "./FiltroCrear";
import { Toaster,toast } from "sonner";


const EXPRESION_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXPRESION_TELEFONO = /^[0-9]{10,15}$/;


const CAMPOS_FORMULARIO = [
  { nombre: "nombre", etiqueta: "Nombre(s)", tipo: "text", ejemplo: "Ingresa el nombre del paciente ", requerido: true,title: "Ingresa el nombre del paciente" },
  { nombre: "apellido", etiqueta: "Apellido(s)", tipo: "text", ejemplo: "Ingresa el apellido del paciente", requerido: true, title: "Ingresa el apellido del paciente"},
  { nombre: "documento", etiqueta: "Documento de Identidad", tipo: "text", ejemplo: "Ingresa el documento del paciente", requerido: true,title: "Ingresa el documento del paciente" },
  { nombre: "fechaNacimiento", etiqueta: "Fecha de Nacimiento", tipo: "date", requerido: true,title: "Ingresa fecha de nacimiento del paciente" },
  { nombre: "telefono", etiqueta: "Teléfono", tipo: "tel", ejemplo: "Ingresa el telefono del paciente", requerido: true,title: "Ingresa el telefono del paciente" },
  { nombre: "email", etiqueta: "Correo Electrónico", tipo: "email", ejemplo: "Ingresa el correo del paciente", requerido: true,title: "Ingresa el correo del paciente" }
];

const CrearPaciente = () => {
  const navegar = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    documento: "",
    fechaNacimiento: "",
  });

  const [errores, setErrores] = useState({});
  const [estaEnviando, setEstaEnviando] = useState(false);

  
  const manejarCambio = useCallback((e) => {
    const { name, value } = e.target;
    setDatosFormulario(prev => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: "" }));
  }, [errores]);

 
  const validarFormulario = useCallback(() => {
    const erroresTemporales = {};

    if (!datosFormulario.nombre.trim()) erroresTemporales.nombre = "Este campo es obligatorio.";
    if (!datosFormulario.apellido.trim()) erroresTemporales.apellido = "Este campo es obligatorio.";
    if (!datosFormulario.documento.trim()) erroresTemporales.documento = "Este campo es obligatorio.";
    if (!datosFormulario.fechaNacimiento) erroresTemporales.fechaNacimiento = "Seleccione una fecha válida.";
    
    if (!datosFormulario.telefono.trim()) {
      erroresTemporales.telefono = "Este campo es obligatorio.";
    } else if (!EXPRESION_TELEFONO.test(datosFormulario.telefono)) {
      erroresTemporales.telefono = "Número no válido. Use solo dígitos (10-15).";
    }
    
    if (!datosFormulario.email.trim()) {
      erroresTemporales.email = "Este campo es obligatorio.";
    } else if (!EXPRESION_EMAIL.test(datosFormulario.email)) {
      erroresTemporales.email = "Correo electrónico no válido.";
    }

    return erroresTemporales;
  }, [datosFormulario]);

  
  const manejarEnvio = async (e) => {
    e.preventDefault();
    const erroresFormulario = validarFormulario();
  
    if (Object.keys(erroresFormulario).length > 0) {
      setErrores(erroresFormulario);
      toast.error("Por favor completa los campos antes de continuar.");
      return;
    }
  
    setEstaEnviando(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8081/paciente/registrar",
        datosFormulario,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Paciente creado con éxito");
      navegar("/pacientes");
    } catch (error) {
      let mensajeError = "Error al crear el paciente";
      let descripcionError = "Ocurrió un error inesperado";
      
      if (error.response) {
        
        if (error.response.status === 409 && error.response.data.message?.toLowerCase().includes("correo")) {
          mensajeError = "Correo electrónico ya registrado";
          descripcionError = "El correo proporcionado ya está en uso por otro paciente";
          
          
          setErrores(prev => ({ ...prev, email: "Este correo ya está registrado" }));
        } 
        
        else if (error.response.data.message) {
          descripcionError = error.response.data.message;
        }
      } else if (error.message) {
        descripcionError = error.message;
      }
      
      toast.error(mensajeError, {
        description: descripcionError,
        action: {
          label: "Reintentar",
          onClick: () => manejarEnvio(e),
        },
      });
    } finally {
      setEstaEnviando(false);
    }
  };

  
  const renderizarCampo = ({ nombre, etiqueta, tipo, ejemplo }) => (
    <div key={nombre} className="mb-4">
      <label htmlFor={nombre} className="block text-sm font-medium text-gray-700 mb-1">
        {etiqueta} {<span className="text-red-500">*</span>}
      </label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={datosFormulario[nombre]}
        onChange={manejarCambio}
        placeholder={ejemplo}
        title={ejemplo}
        className={`w-full px-3 py-2 border rounded-md ${
          errores[nombre] ? "border-red-500" : "border-gray-300 focus:ring-[#5603AD]"
        } focus:outline-none focus:ring-2`}
        max={nombre === "fechaNacimiento" ? new Date().toISOString().split("T")[0] : undefined}
      />
      {errores[nombre] && <p className="mt-1 text-sm text-red-500">{errores[nombre]}</p>}
    </div>
  );

  return (
    <MainLayoutPsicologo>
      <Toaster richColors position="top-right" />
      <div className="p-4 mt-7">
        <FiltroCrear />

        <div className="max-w-6xl mx-auto p-6 rounded-lg ">
          <h1 className="text-xl font-semibold mb-6 text-gray-800">Datos Personales</h1>

          <form onSubmit={manejarEnvio} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAMPOS_FORMULARIO.map(renderizarCampo)}
            </div>

            <div className="flex justify-end pt-4 space-x-3">
              <button
                type="button"
                onClick={() => navegar(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={estaEnviando}
                className="px-4 py-2 bg-[#5603ad] text-white rounded-md hover:bg-[#47038C] disabled:bg-violet-400 flex items-center transition-colors"
              >
                {estaEnviando ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Crear Paciente"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CrearPaciente;