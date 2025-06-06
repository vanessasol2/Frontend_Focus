import React from 'react';
import { Edit2, X, User, Mail, Phone, Check, UserCircle } from "lucide-react";

const Perfil = ({ profilePic, setProfilePic, editMode, setEditMode, userData, setUserData }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona una imagen válida (JPEG, PNG)');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe superar los 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // API aqui pendiente
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Perfil del Psicólogo</h2>
  
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={
                profilePic ||
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }
              alt="Foto de perfil"
            />
          </div>
          {editMode && (
            <label
              htmlFor="profilePic"
              className="absolute bottom-2 right-2 bg-primary-color p-2 rounded-full shadow-lg cursor-pointer transition-all hover:bg-secundary-color"
              title="Cambiar foto"
            >
              <Edit2 className="w-5 h-5 text-white" />
              <input
                type="file"
                id="profilePic"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Nombre completo
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${editMode ? 'border-gray-300 focus:ring-primary-color' : 'border-transparent bg-gray-50'}`}
                readOnly={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={userData.email || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${editMode ? 'border-gray-300 focus:ring-primary-color' : 'border-transparent bg-gray-50'}`}
                readOnly={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                <UserCircle className="w-4 h-4 mr-2" />
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                value={userData.username || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${editMode ? 'border-gray-300 focus:ring-primary-color' : 'border-transparent bg-gray-50'}`}
                readOnly={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={userData.phone || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${editMode ? 'border-gray-300 focus:ring-primary-color' : 'border-transparent bg-gray-50'}`}
                readOnly={!editMode}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Biografía profesional
        </label>
        <textarea
          name="bio"
          value={userData.bio || ''}
          onChange={handleInputChange}
          rows="4"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${editMode ? 'border-gray-300 focus:ring-primary-color' : 'border-transparent bg-gray-50'}`}
          readOnly={!editMode}
          placeholder="Describe tu experiencia, especialidades y enfoque terapéutico..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        {editMode ? (
          <>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 flex items-center bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 flex items-center bg-primary-color text-white rounded-md hover:bg-primary-color transition-colors"
            >
              <Check className="w-5 h-5 mr-2" />
              Guardar cambios
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="px-4 py-2 flex items-center bg-primary-color text-white rounded-md hover:bg-secundary-color transition-colors"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
};

export default Perfil;