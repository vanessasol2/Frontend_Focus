import React from 'react';
import { Lock, ShieldAlert,UserCog, ChevronDown, } from 'lucide-react';

const Section = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <section className="border border-gray-200 rounded-lg overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-semibold text-left text-gray-900">{title}</h2>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="p-5 bg-white">
          {children}
        </div>
      )}
    </section>
  );
};

const PoliticaPrivacidad = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 py-12 font-sans bg-white">
      {/* Encabezado legal */}
      <header className="mb-10 border-b pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Lock size={28} className="text-purple-700" />
          <h1 className="text-3xl font-bold text-gray-900">
            POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES - FOCUSFRAME
          </h1>
        </div>
        <p className="text-sm text-gray-500 uppercase tracking-wider">
          (Según Ley 1581 de 2012 y Decreto 1377 de 2013 - Colombia)
        </p>
      </header>

      {/* Bloque de definiciones */}
      <section className="mb-8 bg-gray-50 p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShieldAlert className="text-purple-600" /> Definiciones
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 text-sm">
          <li><strong>Titular:</strong> Paciente/usuario dueño de los datos</li>
          <li><strong>Tratamiento:</strong> Cualquier operación con datos personales</li>
          <li><strong>Dato sensible:</strong> Salud mental, historial clínico, etc.</li>
          <li><strong>Encargado:</strong> FocusFrame como procesador de datos</li>
        </ul>
      </section>

      {/* Sección clave mejorada */}
      <Section 
        title="5. Derechos de los titulares (Habeas Data)"
        icon={<UserCog className="text-purple-600" />}
      >
        <div className="space-y-4">
          <p>
            Usted puede ejercer estos derechos mediante solicitud escrita enviada al correo electrónico 
            <strong className="text-purple-700"> protecciondatos@focusframe.com</strong> con:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-purple-50">
                <tr>
                  <th className="p-3 text-left">Derecho</th>
                  <th className="p-3 text-left">Procedimiento</th>
                  <th className="p-3 text-left">Plazo de respuesta</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">Acceso</td>
                  <td className="p-3">Solicitud con identificación</td>
                  <td className="p-3">10 días hábiles</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3">Rectificación</td>
                  <td className="p-3">Evidencia de error</td>
                  <td className="p-3">15 días hábiles</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
            <strong>Nota:</strong> Para solicitudes de eliminación de datos, aplican restricciones 
            según el artículo 15 de la Ley 1581 (conservación por obligación legal).
          </div>
        </div>
      </Section>

      
    </div>
  );
};

export default PoliticaPrivacidad;