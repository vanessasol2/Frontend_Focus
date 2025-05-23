import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import passwordService from "../service/passwordService";
import { getBackendMessage } from "../utils/errorMessages";

export default function usePasswordReset() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (email) => {
    setLoading(true);
    try {
      const response = await passwordService.requestPasswordReset(email);

      if (response.status === 200) {
        toast.success(
          <div>
            <p className="font-medium">¡Solicitud recibida!</p>
            <p className="text-sm mt-1">
              Si el correo existe en nuestro sistema, recibirás un enlace para
              restablecer tu contraseña en los próximos minutos.
            </p>
          </div>,
          { duration: 5000 }
        );
        return true;
      }
    } catch (error) {
      console.error("Error al solicitar recuperación:", error);
      const errorMessage = getBackendMessage(error);
      
      toast.error(
        <div>
          <p className="font-medium">No pudimos procesar tu solicitud</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>,
        {
          duration: 5000,
          action: {
            label: 'Reintentar',
            onClick: () => handlePasswordReset(email)
          }
        }
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePasswordReset,
    navigate
  };
}