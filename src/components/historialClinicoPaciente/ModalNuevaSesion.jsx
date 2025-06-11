import React, { useState } from 'react';
import { X } from 'lucide-react';

const ModalNuevaSesion = ({ isOpen, onClose, onSubmit, idPaciente, idTerapia }) => {
  const [errors, setErrors] = useState({});
  if (!isOpen) return null;

  const fechaHoy = new Date().toISOString().split('T')[0];

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.fechaSesion) newErrors.fechaSesion = 'Fecha requerida';
    if (!data.horaInicio) newErrors.horaInicio = 'Hora de inicio requerida';
    if (!data.horaFin) newErrors.horaFin = 'Hora de fin requerida';
    if (!data.nombre) newErrors.nombre = 'Nombre requerido';
    if (data.horaInicio && data.horaFin && data.horaFin <= data.horaInicio) {
      newErrors.horaFin = 'La hora fin debe ser posterior a la hora inicio';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevaSesion = {
      fechaSesion: formData.get('fechaSesion'),
      horaInicio: formData.get('horaInicio'),
      horaFin: formData.get('horaFin'),
      nombre: formData.get('nombre'),
      notasAdicionales: formData.get('notasAdicionales'),
      idPaciente,
      idTerapia,
    };
    const validationErrors = validateForm(nuevaSesion);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(nuevaSesion);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nueva Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Fecha de sesión*</label>
            <input name="fechaSesion" type="date" defaultValue={fechaHoy} className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.fechaSesion ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.fechaSesion && (<p className="mt-1 text-sm text-red-500">{errors.fechaSesion}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Hora de inicio*</label>
              <input name="horaInicio" type="time" className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.horaInicio ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.horaInicio && (<p className="mt-1 text-sm text-red-500">{errors.horaInicio}</p>)}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Hora de fin*</label>
              <input name="horaFin" type="time" className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.horaFin ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.horaFin && (<p className="mt-1 text-sm text-red-500">{errors.horaFin}</p>)}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Nombre*</label>
            <input name="nombre" type="text" className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.nombre && (<p className="mt-1 text-sm text-red-500">{errors.nombre}</p>)}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Notas adicionales</label>
            <textarea name="notasAdicionales" rows="3" className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm" />
          </div>
          <button type="submit" className="w-full bg-primary-color text-white rounded-md py-2 text-sm font-medium hover:bg-secundary-color">
            Guardar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalNuevaSesion;
