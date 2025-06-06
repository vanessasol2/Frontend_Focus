import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from "./SidebarPsicologo";
import HeaderMedico from "./HeaderPsicologo";

const MainLayoutPsicologo = ({ children }) => {
  return (
    <div className="h-screen flex bg-content-bg">
      {/* LEFT Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="h-full" /> 
      </div>

      {/* RIGHT Content */}
      <div className="flex-1 bg-content-bg overflow-auto flex flex-col">
        <HeaderMedico /> 
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

MainLayoutPsicologo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainLayoutPsicologo;