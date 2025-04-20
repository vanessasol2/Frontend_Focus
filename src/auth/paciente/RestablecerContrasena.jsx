import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RestablecerContrasena = () => {
  const [searchParams] = useSearchParams();
  const [tokenValido, setTokenValido] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  
  const token = searchParams.get('token');

  
  useEffect(() => {
    const validarToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/auth/validate-reset-token?token=${token}`
        );
        
        if (response.data.valid) {
          setTokenValido(true);
        } else {
          setMensaje('El enlace de recuperación no es válido o ha expirado');
          setTokenValido(false);
        }
      } catch (error) {
        console.error('Error al validar token:', error);
        setMensaje('Ocurrió un error al validar el enlace');
        setTokenValido(false);
      } finally {
        setCargando(false);
      }
    };

    if (token) {
      validarToken();
    } else {
      setMensaje('No se encontró el token de recuperación');
      setTokenValido(false);
      setCargando(false);
    }
  }, [token]);

  
  const onSubmit = async (data) => {
    try {
      setCargando(true);
      const response = await axios.post(
        'http://localhost:8080/auth/restablecerContra',
        {
          token,
          nueva: data.nuevaContrasena
        }
      );

      if (response.data.success) {
        setMensaje('¡Contraseña actualizada correctamente!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMensaje(response.data.message || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      setMensaje('Ocurrió un error al actualizar la contraseña');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p>Validando enlace de recuperación...</p>
        </div>
      </div>
    );
  }

  if (!tokenValido) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-primary-color mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{mensaje}</p>
          <button
            onClick={() => navigate('/olvido-contrasena')}
            className="px-4 py-2 bg-primary-color text-white rounded hover:bg-secundary-color"
          >
            Solicitar nuevo enlace
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Restablecer Contraseña</h2>
        
        {mensaje && (
          <div className={`mb-4 p-3 rounded ${mensaje.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nuevaContrasena" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              id="nuevaContrasena"
              type="password"
              {...register('nuevaContrasena', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres'
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
            />
            {errors.nuevaContrasena && (
              <p className="mt-1 text-sm text-red-600">{errors.nuevaContrasena.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="confirmarContrasena"
              type="password"
              {...register('confirmarContrasena', {
                required: 'Por favor confirma tu contraseña',
                validate: value =>
                  value === watch('nuevaContrasena') || 'Las contraseñas no coinciden'
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
            />
            {errors.confirmarContrasena && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmarContrasena.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {cargando ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestablecerContrasena;