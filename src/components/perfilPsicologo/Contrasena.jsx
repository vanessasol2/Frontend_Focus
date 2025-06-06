import React from 'react';
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";
import axios from 'axios';
import { errorMessages } from '../../utils/errorMessages';

const Contrasena = () => {
  const [formData, setFormData] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.actual.trim()) {
      newErrors.currentPassword = errorMessages['validation.required'];
    }
    
    if (!formData.nueva.trim()) {
      newErrors.newPassword = errorMessages['validation.required'];
    } else if (formData.nueva.length < 6) {
      newErrors.newPassword = errorMessages['validation.password'];
    } else if (!/[A-Z]/.test(formData.nueva)) {
      newErrors.newPassword = 'Debe contener al menos una mayúscula';
    } else if (!/[0-9]/.test(formData.nueva)) {
      newErrors.newPassword = 'Debe contener al menos un número';
    }
    
    if (formData.nueva !== formData.confirmar) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setApiError(null);
    
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
      if (!token) {
        setApiError('No se ha encontrado un token de autenticación');
        return;
      }

      console.log('Token que se está mandando:', token);

      const response = await axios.post('http://localhost:8081/auth/cambioContra', {
        actual: formData.actual,
        nueva: formData.nueva,
        confirmar: formData.confirmar
      },{
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          actual: '',
          nueva: '',
          confirmar: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error de API:', error);

      if (error.response) {
        const errorMessage = error.response.data;
        setApiError(errorMessage);
        if (error.response.status === 400 && errorMessage.includes('incorrecta')) {
          setErrors(prev => ({
            ...prev,
            actual: 'La contraseña actual es incorrecta'
          }));
        } else if (error.response.status === 403) {
          setApiError('No tienes permisos para realizar esta acción. Por favor, revisa tu autenticación.');
        } else {
          setApiError('Error inesperado del servidor.');
        }
      } else {
        setApiError('Error al conectar con el servidor');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Cambiar contraseña</h2>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {errorMessages['password.changed.success']}
        </div>
      )}

      {apiError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="actual" className="block text-sm font-medium text-gray-600 mb-1">
            Contraseña actual
          </label>
          <div className="relative">
            <input
              id="actual"
              name="actual"
              type={showPassword.current ? "text" : "password"}
              value={formData.actual}
              onChange={handleChange}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-1 focus:outline-none focus:ring-primary-color focus:border-primary-color transition ${
                errors.currentPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa tu contraseña actual"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
          )}
        </div>

        <div>
          <label htmlFor="nueva" className="block text-sm font-medium text-gray-600 mb-1">
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              id="nueva"
              name="nueva"
              type={showPassword.new ? "text" : "password"}
              value={formData.nueva}
              onChange={handleChange}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-1 focus:outline-none  focus:ring-primary-color focus:border-primary-color transition ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa tu nueva contraseña"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.newPassword ? (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">
              {errorMessages['validation.password']}, incluyendo mayúsculas y números
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmar" className="block text-sm font-medium text-gray-600 mb-1">
            Confirmar nueva contraseña
          </label>
          <div className="relative">
            <input
              id="confirmar"
              name="confirmar"
              type={showPassword.confirm ? "text" : "password"}
              value={formData.confirmar}
              onChange={handleChange}
              className={`w-full px-4 py-2 pr-10 border rounded-md focus:ring-1 focus:outline-none
                 focus:ring-primary-color focus:border-primary-color transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirma tu nueva contraseña"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            className={`w-full px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secundary-color transition-colors flex justify-center items-center ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isSubmitting}
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
              'Actualizar contraseña'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contrasena;
