import React, { useState } from 'react';
import { X } from 'lucide-react';

const ModalNuevaTerapia = ({ isOpen, onClose, onSubmit }) => {
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.descripcion) newErrors.descripcion = 'Descripción requerida';
    if (!data.fechaInicio) newErrors.fechaInicio = 'Fecha requerida';
    if (!data.fechaFin) newErrors.fechaFin = 'Fecha requerida';
    if (new Date(data.fechaFin) < new Date(data.fechaInicio)) {
      newErrors.fechaFin = 'La fecha fin debe ser posterior';
    }
    if (data.numeroSesiones < 1) newErrors.numeroSesiones = 'Mínimo 1 sesión';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nuevaTerapia = {
      descripcion: formData.get('descripcion'),
      fechaInicio: formData.get('fechaInicio'),
      fechaFin: formData.get('fechaFin'),
      tipoTerapia: formData.get('tipoTerapia'),
      numeroSesiones: Number(formData.get('numeroSesiones')),
      estado: 'En progreso'
    };

    const validationErrors = validateForm(nuevaTerapia);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(nuevaTerapia);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nueva Terapia</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Descripción*</label>
            <input
              name="descripcion"
              type="text"
              className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.descripcion ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.descripcion && (
              <p className="mt-1 text-sm text-red-500">{errors.descripcion}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Fecha inicio*</label>
              <input
                name="fechaInicio"
                type="date"
                className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.fechaInicio ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.fechaInicio && (
                <p className="mt-1 text-sm text-red-500">{errors.fechaInicio}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Fecha fin*</label>
              <input
                name="fechaFin"
                type="date"
                className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.fechaFin ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.fechaFin && (
                <p className="mt-1 text-sm text-red-500">{errors.fechaFin}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de terapia*</label>
            <select
              name="tipoTerapia"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Seleccione tipo de terapia</option>
              <option value="familiar">Familiar</option>
              <option value="grupal">Grupal</option>
              <option value="individual">Individual</option>
              <option value="pareja">Pareja</option>
              <option value="infantil">Infantil</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Número de sesiones*</label>
            <input
              name="numeroSesiones"
              type="number"
              min="1"
              defaultValue="1"
              className={`w-full mt-1 border rounded-md p-2 text-sm ${errors.numeroSesiones ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.numeroSesiones && (
              <p className="mt-1 text-sm text-red-500">{errors.numeroSesiones}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-color text-white rounded-md py-2 text-sm font-medium hover:bg-secundary-color"
          >
            Guardar Terapia
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalNuevaTerapia;