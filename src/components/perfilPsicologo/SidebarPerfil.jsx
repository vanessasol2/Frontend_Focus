import { UserCircle, Lock } from "lucide-react";

const SidebarPerfil = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 p-6 bg-gray-50 border-r border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Configuración</h2>
      <ul className="space-y-2">
        <li
          className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeTab === 'profile'
              ? 'bg-violet-100 text-primary-color font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <UserCircle size={16} />
          Perfil
        </li>
        <li
          className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
            activeTab === 'password'
              ? 'bg-violet-100 text-primary-color font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => setActiveTab('password')}
        >
          <Lock size={16} />
          Contraseña
        </li>
      </ul>
    </div>
  );
};

export default SidebarPerfil;
