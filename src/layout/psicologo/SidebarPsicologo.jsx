import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { logout } from "../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, BriefcaseMedical, LogOut, ChevronLast, ChevronFirst, Users, User } from "lucide-react";
import "../style/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    dispatch(logout()); 
    navigate("/login"); 
  };

  const [expanded, setExpanded] = useState(
    JSON.parse(localStorage.getItem("sidebarExpanded")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    
    const routeMappings = {
      '/crear-paciente': '/pacientes',
      '/editar-paciente': '/pacientes',
      '/historial-clinico-paciente': '/historial',
      '/perfil-psicologo': '/perfil',
      '/home-psicologo': '/home-psicologo',
      '/citas-psicologo': '/citas-psicologo',
      '/comunicacion-psicologo': '/comunicacion'
    };
    
    const currentPath = routeMappings[location.pathname] || location.pathname;
    const targetPath = routeMappings[path] || path;
    
    return currentPath === targetPath || 
           currentPath.startsWith(`${targetPath}/`);
  };

  return (
    <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar__header">
        {expanded && <h2 className="sidebar__title">FocusFrame</h2>}
        <button onClick={() => setExpanded(!expanded)} className="toggle-btn">
          {expanded ? <ChevronLast /> : <ChevronFirst />}
        </button>
      </div>

      <nav className="sidebar__nav">
        <SidebarLink 
          to="/home-psicologo" 
          text="Inicio" 
          icon={<HomeIcon />} 
          active={isActive("/home-psicologo", true)} 
          expanded={expanded} 
        />
        <SidebarLink 
          to="/citas-psicologo" 
          text="Citas" 
          icon={<BriefcaseMedical />} 
          active={isActive("/citas-psicologo", true)} 
          expanded={expanded} 
        />
        <SidebarLink 
          to="/pacientes" 
          text="Pacientes" 
          icon={<Users />} 
          active={isActive("/pacientes")} 
          expanded={expanded} 
        />
        <SidebarLink 
          to="/perfil-psicologo" 
          text="Perfil" 
          icon={<User />} 
          active={isActive("/perfil-psicologo", true)} 
          expanded={expanded} 
        />  
      </nav>

      <div className="sidebar__logout">
        <button onClick={handleLogout} className="logout-button">
          <LogOut className="logout-icon" />
          {expanded && <span className="logout-text">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, text, icon, active, expanded }) => {
  return (
    <Link 
      to={to} 
      className={`sidebar__link ${active ? "sidebar__link--active" : ""}`} 
      aria-current={active ? "page" : undefined}
    >
      <span className="sidebar__link-icon">{icon}</span>
      {expanded && <span className="sidebar__link-text">{text}</span>}
    </Link>
  );
};

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  active: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired
};

export default Sidebar;