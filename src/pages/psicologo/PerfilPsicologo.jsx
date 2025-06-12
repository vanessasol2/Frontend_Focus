import React from 'react';
import { useState } from 'react';
import MainLayoutPsicologo from '../../layout/psicologo/MainLayoutPsicologo';

import Contrasena from '../../components/perfilPsicologo/Contrasena';
import SidebarPerfil from '../../components/perfilPsicologo/SidebarPerfil';

const PerfilPsicologo = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    fullName: 'Christine Brown',
    email: 'christinebrown@gmail.com',
    username: 'christinebrown',
    phone: '945-913-2196',
    bio: 'Senior blog writer at Hamill Group since 2017.\nI\'ve also been lucky enough to work for the Parisian LLC.'
  });

  return (
    <MainLayoutPsicologo>
      <div className="flex max-w-6xl mx-auto font-sans overflow-hidden">
        <SidebarPerfil activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-8">
            <Contrasena />
        </div>
      </div>
    </MainLayoutPsicologo>
  );
};

export default PerfilPsicologo;
