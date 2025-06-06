import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex bg-layout-bg">
      {/* LEFT Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="h-full" /> 
      </div>

      {/* RIGHT Content */}
      <div className="flex-1 bg-content-bg overflow-auto flex flex-col">
        <Header /> 
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

// Validaciones de PropTypes
MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainLayout;