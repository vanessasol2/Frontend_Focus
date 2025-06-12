import React, { useState, useEffect } from 'react';

const NotesCard = ({ pacienteId }) => {
  const CATEGORIAS = {
    GENERAL: 'GENERAL',
    DIAGNOSTICO: 'DIAGNOSTICO',
    TRATAMIENTO: 'TRATAMIENTO'
  };


  const getCategoryBadge = (category) => {
    const baseStyle = "text-xs px-2 py-1 rounded-full";
    switch (category) {
      case CATEGORIAS.DIAGNOSTICO:
        return `${baseStyle} bg-blue-100 text-blue-800`;
      case CATEGORIAS.TRATAMIENTO:
        return `${baseStyle} bg-green-100 text-green-800`;
      default:
        return `${baseStyle} bg-gray-100 text-gray-800`;
    }
  };

  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    categoriaNota: CATEGORIAS.GENERAL
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pacienteId) {
      loadNotes();
    }
  }, [pacienteId]);

  const loadNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8081/notas/obtener?pacienteId=${pacienteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar las notas');
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddNote = async () => {
    if (!formData.titulo.trim() || !formData.contenido.trim()) {
      setError('Título y contenido son obligatorios');
      return;
    }

    if (!pacienteId) {
      setError('No se ha seleccionado un paciente');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/notas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          contenido: formData.contenido,
          categoriaNota: formData.categoriaNota,
          pacienteId: pacienteId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar la nota');
      }

      const savedNote = await response.json();
      setNotes([...notes, savedNote]);
      setFormData({
        titulo: '',
        contenido: '',
        categoriaNota: CATEGORIAS.GENERAL
      });
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Notas Médicas</h2>
        <div className="flex space-x-2">
          <button
            className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
            onClick={loadNotes}
          >
            Recargar
          </button>
          <button
            className="bg-primary-color text-white px-3 py-1 rounded-md text-sm hover:bg-secundary-color transition"
            onClick={() => setIsModalOpen(true)}
          >
            Nueva Nota
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-500 p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="text-sm text-gray-700 space-y-3 mb-4 max-h-64 overflow-y-auto">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{note.titulo}</h3>
                <span className={getCategoryBadge(note.categoriaNota)}>
                  {note.categoriaNota.toLowerCase()}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{note.contenido}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No hay notas registradas</p>
        )}
      </div>

      {/* Modal para crear nueva nota */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Nueva Nota Médica</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isSaving}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Título de la nota"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                  <textarea
                    name="contenido"
                    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Descripción detallada..."
                    rows={4}
                    value={formData.contenido}
                    onChange={handleInputChange}
                    disabled={isSaving}
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    name="categoriaNota"
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                    value={formData.categoriaNota}
                    onChange={handleInputChange}
                    disabled={isSaving}
                    required
                  >
                    <option value="" disabled selected>Seleccione una categoría</option>
                    <option value={CATEGORIAS.GENERAL}>General</option>
                    <option value={CATEGORIAS.DIAGNOSTICO}>Diagnóstico</option>
                    <option value={CATEGORIAS.TRATAMIENTO}>Tratamiento</option>
                  </select>
                  {!formData.categoriaNota && (
                    <p className="mt-1 text-xs text-red-500">Por favor seleccione una categoría</p>
                  )}
                </div>

                {error && (
                  <div className="text-sm text-red-500 p-2 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                  <button
                    className={`bg-primary-color text-white px-4 py-2 rounded-md hover:bg-secundary-color transition text-sm ${isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    onClick={handleAddNote}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="inline animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      'Guardar Nota'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesCard;