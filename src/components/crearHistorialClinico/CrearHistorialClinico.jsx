import React, { useState } from "react";
import { User, Pill, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import MainLayoutPsicologo from "../../layout/MainLayoutPsicologo";
import FiltroCrear from "../../components/crearPaciente/FiltroCrear";

const CrearHistorialClinico = () => {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({
    nombre: '',
    telefono: '',
    documento: '',
    tipoDocumento: 'CC',
    medicamento: '',
    dosificacion: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    ocupacion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del paciente:', paciente);
    
  };

  return (
    <MainLayoutPsicologo>
      <div className="p-4 mt-7">
        <FiltroCrear />
        
        <div className="max-w-6xl mx-auto p-6 rounded-lg ">
          <h1 className="text-xl font-semibold mb-6 text-gray-800">
            Nueva Historia Clínico
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección Datos Personales */}
            <section className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <User size={20} />
                Datos Personales
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={paciente.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={paciente.telefono}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Documento</label>
                  <input
                    type="text"
                    name="documento"
                    value={paciente.documento}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                  <select
                    name="tipoDocumento"
                    value={paciente.tipoDocumento}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PA">Pasaporte</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Sección Datos Médicos */}
            <section className="p-6 ">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <Pill size={20} />
                Datos Médicos
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Medicamento</label>
                  <input
                    type="text"
                    name="medicamento"
                    value={paciente.medicamento}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Dosificación</label>
                  <input
                    type="text"
                    name="dosificacion"
                    value={paciente.dosificacion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Sección Historial */}
            <section className="p-6 ">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#5603AD]">
                <Search size={20} />
                Historial del Paciente Nuevo
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={paciente.apellido}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={paciente.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={paciente.fechaNacimiento}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Ocupación</label>
                  <input
                    type="text"
                    name="ocupacion"
                    value={paciente.ocupacion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#5603AD] text-white rounded-md hover:bg-[#47038C] focus:outline-none focus:ring-2 focus:ring-[#5603AD] focus:ring-opacity-50 transition-colors"
              >
                Guardar Historial
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default CrearHistorialClinico;