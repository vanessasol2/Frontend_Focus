import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowLeft } from "lucide-react";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";

const CrearPaciente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    documento: "",
    fechaNacimiento: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.nombre.trim()) tempErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) tempErrors.apellido = "El apellido es requerido";
    if (!formData.telefono.trim()) {
      tempErrors.telefono = "El teléfono es requerido";
    } else if (!phoneRegex.test(formData.telefono)) {
      tempErrors.telefono = "Teléfono no válido";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Correo electrónico no válido";
    }
    if (!formData.documento.trim()) tempErrors.documento = "El documento es requerido";
    if (!formData.fechaNacimiento) tempErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post("http://localhost:8081/paciente/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear paciente");
      }

      const data = await response.json();
      console.log("Paciente creado:", data);
      alert("Paciente creado con éxito");
      navigate("/pacientes");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Ocurrió un error al crear el paciente");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayoutPsicologo>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#5603ad] mr-4"
          >
            <ArrowLeft size={20} className="mr-1" />
          </button>
          <h1 className="text-2xl font-semibold text-[#5603ad] flex items-center">
            <UserPlus size={24} className="mr-2 text-[#5603ad]" />
            Crear Nuevo Paciente
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre(s) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.nombre ? "border-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5603AD] "}`}
                placeholder="Ingrese el nombre"
              />
              {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido(s) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.apellido ? "border-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5603AD]"}`}
                placeholder="Ingrese el apellido"
              />
              {errors.apellido && <p className="mt-1 text-sm text-red-500">{errors.apellido}</p>}
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documento de Identidad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.documento ? "border-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5603AD]"}`}
                placeholder="Número de documento"
              />
              {errors.documento && <p className="mt-1 text-sm text-red-500">{errors.documento}</p>}
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.fechaNacimiento ? "border-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5603AD]"}`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.fechaNacimiento && <p className="mt-1 text-sm text-red-500">{errors.fechaNacimiento}</p>}
            </div>

          
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.telefono ? "border-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5603AD]"}`}
                placeholder="Ej: 3101234567"
              />
              {errors.telefono && <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5603AD]"}`}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#5603ad] text-white rounded-md hover:bg-[#47038C] disabled:bg-violet-400 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
    </MainLayoutPsicologo>
  );
};

export default CrearPaciente;